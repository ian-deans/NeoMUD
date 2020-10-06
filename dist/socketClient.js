"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const client = net_1.default.createConnection({ port: 5000 }, () => {
    console.log('CLIENT: I connected to the server');
    // client.write( 'CLIENT: Hello this is the client' )
});
client.on('data', data => {
    console.log(data.toString());
});
client.on('end', () => {
    console.log('CLIENT: Connection terminated.');
    process.exit();
});
process.stdin.on('data', data => {
    const command = JSON.stringify({
        player: '3r123r-3r1r1',
        location: ['213f-3211e1', '21r1s-223g12'],
        command: data.toString().trim(),
    });
    client.write(command);
});
//# sourceMappingURL=socketClient.js.map