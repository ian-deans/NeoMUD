"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
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
wss.on('connection', function connection(ws) {
    const isOpen = client => client !== ws && client.readyState === ws_1.default.OPEN;
    console.log('client connected');
    wss.clients.forEach(client => {
        if (isOpen(client)) {
            const eventString = `Client Connected`;
            client.send(JSON.stringify({
                scope: 'global',
                type: 'event',
                content: eventString,
            }));
        }
    });
    ws.on('message', function incoming(data) {
        console.log('incomming message');
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
                .forEach(playerInRoom => playerInRoom.socket.send(returnData));
        }
    });
});
Channel_1.chat.on('chat', message => {
    console.log(message);
    wss.clients.forEach(client => {
        // if ( isOpen( client ) ) {
        client.send(JSON.stringify({
            scope: 'global',
            type: 'communication',
            content: message
        }));
        // }
    });
});
/*
const wss = new WebSocketServer( { httpServer: server } );
function originIsAllowed( origin ) {
    return true;
}
wss.on( 'request', function ( request ) {
    if ( !originIsAllowed( request.origin ) ) {
        request.reject();
        console.log( ( new Date() ) + ' Connection from origin ' + request.origin + ' rejected.' );
        return;
    }

    const connection = request.accept( 'echo-protocol', request.origin );
    connections.push( connection );

    console.log( `${ new Date() }: Client connection accepted` );

    const welcomeMessage = {
        type: 'message',
        content: `Welcome to the WebSocket MUD Thing!\n`
    }


    chat.on( 'chat', function ( message ) {
        console.log( message )
        connection.send( JSON.stringify( {
            type: 'chat',
            scope: 'global',
            message
        } ) )
    } )


    connection.send( JSON.stringify( welcomeMessage ) )

    connection.on( 'message', function ( message ) {


        if ( !message.utf8Data ) {
            return;
        }

        const data = JSON.parse( message.utf8Data.toString() );
        const { clientID, player, command } = data;

        console.log( "From client " + clientID )
        console.log( data )

        if ( command ) {
            const [ commandName, ...parameters ] = data.command.split( " " );

            let returnData;

            switch ( commandName ) {
                case 'say': {
                    const sayString = `${ player.name } says, "${ parameters.join( " " ) }"`
                    returnData = { type: 'message', roomID: player.roomID, content: sayString, player }
                    break;
                    // const data = JSON.stringify( { tag: 'chat', content: 'This is a message' } )

                    // connection.send( data )

                    // return connection.send( JSON.stringify( returnData ) )
                }

                case 'attack': {
                    const [ target ] = parameters;
                    const messageString = `${ player } attacks ${ target }!`;
                    returnData = { clientID, type: 'message', roomId: player.roomID, content: messageString, player }
                    break;
                    // return connection.send( JSON.stringify( returnData ) )
                }

                case 'chat': {
                    const chatString = `[CHAT]${ player.name }: "${ parameters.join( " " ) }"`
                    chat.send( chatString )
                    // returnData = { type: 'message', scope: 'global', content: chatString }
                    break;
                }

                default: {
                    return
                }
            }

            connection.send( JSON.stringify( returnData ) )
        }


    } )

    connection.on( 'close', function ( reasonCode, description ) {
        console.log( ( new Date() ) + ' Peer ' + connection.remoteAddress + ' disconnected.' );

    } )

} )
*/
server.listen(PORT, () => {
    console.log(`Server up on port ${PORT}.`);
});
// module.exports = connection ? connection : null;
//# sourceMappingURL=server.js.map