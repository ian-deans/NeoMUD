import net from 'net';
import Game from './src/Game'


class GameServer {
    server: any;
    port: number;
    game: any;

    constructor() {
        this.game = new Game({});
        this.port = 5000;
        this.server = net.createServer( ( socket ) => {

            // on message from http/ws server
            socket.on( 'data', data => {
                const message = GameServer._parsedData( data )
                console.log('Message received:')
                console.log( message )
            } )
        } ).on( 'error', error => {
            console.error( error )
        } )
    }

    start() {
        this.server.listen( this.port, () => {
            console.log( 'Game server started on port ' + this.port )
        } )
    }

    static _parsedData( data ) {
        return JSON.parse( data.toString().trim() )
    }
}


const gameServer = new GameServer();

gameServer.start();