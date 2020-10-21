require( 'dotenv' ).config()
import * as net from 'net';
import Game from '@components/Game'
import config from '@common/config';
import { IMessage, ITick } from '@common/interfaces'

class GameServer {
    server: net.Server;
    port: number;
    game: Game;

    httpServers: net.Socket[];

    constructor() {
        this.game = new Game( {} );
        this.port = config.GAME_PORT;
        this.httpServers = []

        this.addHttpServer = this.addHttpServer.bind( this )
        this.remHttpServer = this.remHttpServer.bind( this )
        this.broadcast = this.broadcast.bind( this )
        this.setup = this.setup.bind( this )
        this.start = this.start.bind( this )

        this.server = net.createServer( ( socket ) => {

            console.log( `TCP Socket connection opened.` )
            this.addHttpServer( socket );

            socket.on( 'open', () => {
                console.log( `TCP Socket connection made.` )
            } )

            socket.on( 'close', () => {
                console.log( 'Connection closed.' )
                this.remHttpServer( socket )
            } )

            // on message from http/ws server
            socket.on( 'data', ( data: Buffer ) => {
                console.info( 'Message received from http server.' )

                const message: IMessage = GameServer._parsedData( data );
                const { scope, clientID } = message;

                const scopeIsGlobal = scope === 'global';
                if ( scopeIsGlobal ) {
                    // pass to game comamnd handler
                } else {
                    // pass to player command hadler
                }

                console.log( message )

                console.info( 'Sending message to http server...' )
                const responseData = {
                    clientID,
                    scope: 'global',
                    type: 'test',
                    content: 'Server receieved message.'
                }

                this.broadcast( responseData )
            } )
        } ).on( 'error', error => {
            console.error( error )
        } )
    }

    setup(): void {
        this.game.listenTo( {
            event: 'tick', cb: () => {
                const data = {
                    scope: 'global',
                    type: 'tick',
                }
                this.broadcast( data )
            }
        } )
    }

    broadcast( data: IMessage ): void {
        const messageJSON: string = JSON.stringify( data )
        this.httpServers.forEach( (socket: net.Socket ) => {
            const socketIsWritable: boolean = socket.writable

            if ( socketIsWritable ) {
                socket.write( messageJSON )
            }
        } )
    }

    remHttpServer( socket: net.Socket ): void {
        this.httpServers = this.httpServers.filter( server => server !== socket )
    }

    addHttpServer( socket: net.Socket ): void {
        this.httpServers.push( socket )
    }

    start(): void {
        console.log( 'Starting Game...' )
        this.game.start()

        this.game.globalEvent.on( 'tick', (tickData: ITick) => {
            const message: IMessage = {
                scope: 'global',
                type: 'tick',
                content: tickData,
            }
            console.info( 'Broadcasting Tick' )
            this.broadcast( message )
        } )

        this.server.listen( this.port, () => {
            console.log( 'Game server started on port ' + this.port )
        } )
    }

    static _parsedData( data: Buffer ): IMessage {
        return JSON.parse( data.toString().trim() )
    }
}

const gameServer = new GameServer();

gameServer.start();

