"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// import { server as WebSocketServer } from 'websocket';
const ws_1 = __importDefault(require("ws"));
const Channel_1 = require("./src/Channel");
process.title = 'Game Alpha';
const app = express_1.default();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server });
const players = {
    "A1": {
        uid: "A1",
        name: "Ian",
        roomID: "1A",
        clientID: null,
        socket: null,
    },
    "B1": {
        uid: "B1",
        name: "Guy",
        roomID: "1A",
        clientID: null,
        socket: null,
    },
};
wss.on('connection', connectClient);
Channel_1.chat.on('chat', message => {
    console.log('--> Chat event detected, sending to clients.');
    wss.clients.forEach(client => {
        client.send(JSON.stringify({
            scope: 'global',
            type: 'communication',
            content: message
        }));
    });
});
function handleIncomingData(data, ws) {
    const parsedData = JSON.parse(data.toString());
    const { type, clientID } = JSON.parse(data.toString());
    if (type === 'player-login') {
        const { playerName } = parsedData;
        const player = Object.values(players).find(player => player.name === playerName);
        players[player.uid].clientID = clientID;
        players[player.uid].socket = ws;
        ws.send(JSON.stringify({
            type: 'player-login',
            playerUID: player.uid,
        }));
        return;
    }
    const { command, playerUID } = parsedData;
    const player = players[playerUID];
    const [cmd, ...params] = command.split(" ");
    if (cmd === 'chat') {
        const chatString = `[chat]${player.name}> "${params.join(" ")}"`;
        Channel_1.chat.send(chatString);
    }
    if (cmd === 'say') {
        const roomID = player.roomID;
        const sayString = `${player.name} says, "${params.join(" ")}"`;
        // global.players[player.uid].location.emit('say', 'stuff')
        const returnData = JSON.stringify({
            clientID,
            type: 'communication',
            content: sayString,
        });
        Object.values(players)
            .filter(player => player.roomID === roomID)
            .filter(player => player.socket !== null)
            .forEach(playerInRoom => playerInRoom.socket.send(returnData));
    }
}
function connectClient(ws) {
    const isOpen = client => client !== ws && client.readyState === ws_1.default.OPEN;
    console.log('client connected');
    wss.clients.forEach(client => {
        if (isOpen(client)) {
            const eventString = `A player has logged in.`;
            client.send(JSON.stringify({
                scope: 'global',
                type: 'event',
                content: eventString,
            }));
        }
    });
    ws.on('message', data => handleIncomingData(data, ws));
}
server.listen(PORT, () => {
    console.log(`Server up on port ${PORT}.`);
});
//# sourceMappingURL=server.js.map