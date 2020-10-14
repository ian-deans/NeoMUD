require( 'dotenv' ).config()
import net from 'net';
import Game from './src/Game'

class GameServer {
    server: any;
    port: number;
    game: any;
    httpServers: any;
    connections: any[];

    constructor() {
        this.game = new Game( {} );
        this.port = parseInt( process.env.GAME_SERVER_PORT );
        this.httpServers = []

        this.addHttpServer = this.addHttpServer.bind( this )
        this.broadcast = this.broadcast.bind( this )
        this.setup = this.setup.bind( this )
        this.start = this.start.bind( this )

        this.server = net.createServer( ( socket ) => {

            console.log( `TCP Socket connection opened.` )
            this.addHttpServer( socket );

            // on message from http/ws server
            socket.on( 'data', data => {
                const message = GameServer._parsedData( data );
                const { scope, clientID, type, content } = message;
                console.info( 'Message received from http server.' )

                const scopeIsGlobal = scope === 'global';
                if ( scopeIsGlobal ) {
                    // pass to game comamnd handler
                } else {
                    // pass to player command hadler
                }

                console.log( message )

                console.info( 'Sending message to http server...' )
                const responseData = { clientID, type: 'test', content: 'Server receieved message.' }

                this.broadcast( responseData )
            } )
        } ).on( 'error', error => {
            console.error( error )
        } )

        // this.setup()

    }

    setup() {
        this.game.listenTo( {
            event: 'tick', cb: function () {
                const data = {
                    scope: 'global',
                    type: 'tick',
                }
                this.broadcast( data )
            }
        } )


    }

    broadcast( data ) {
        const message = JSON.stringify( data )
        this.httpServers.forEach( socket => socket.write( message ) )
    }

    addHttpServer( socket ) {
        this.httpServers.push( socket )
    }

    start() {
        console.log('Starting Game...')
        // this.game.start()

        console.log('PORT ', this)
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

