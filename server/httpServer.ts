require( 'dotenv' ).config()
import 'module-alias/register'

import express from 'express'
import http from 'http'
import WebSocket from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { createConnection } from 'net'
import { GAME_PORT, HTTP_PORT } from '@common/config'

/**
 * Acts as an entry point for clients to send data to the game server using WebSocket
 * to communicate with clients and a TCP socket to communicate to the GameSever.
 * Maintains a collection of the web socket connections and their client id to help
 * direct data to the correct players/
 */

process.title = 'http_ws_server'

const BASE10 = 10

interface IClients {
    [key: string]: WebSocket,
}

class HttpServer {
    HTTP_PORT: number
    GAME_PORT: number
    wsClients: any
    httpServer: any
    wsServer: any
    gameServer: any

    constructor() {
        this.HTTP_PORT = HTTP_PORT
        this.GAME_PORT = GAME_PORT
        this.wsClients = {}

        this.setup = this.setup.bind( this )
        this.start = this.start.bind( this )
        this.attachListeners = this.attachListeners.bind( this )

        this.connectWSClient = this.connectWSClient.bind( this )
        this.handshakeWSClient = this.handshakeWSClient.bind( this )
        this.sendToWSClient = this.sendToWSClient.bind( this )

        this.routeFromClientToGame = this.routeFromClientToGame.bind( this )
        this.routeFromGameToWSClient = this.routeFromGameToWSClient.bind( this )
        this.getWSClient = this.getWSClient.bind( this )
        this.addWSClient = this.addWSClient.bind( this )

        this.setup()
    }

    setup() {
        this.gameServer = createConnection( { port: this.GAME_PORT }, () => {
            console.info( `Connection to game server established on port ${ this.GAME_PORT }` )
        } )

        const app = express()
        this.httpServer = http.createServer( app )
        this.wsServer = new WebSocket.Server( { server: this.httpServer } )

        this.attachListeners()
    }

    attachListeners() {
        this.gameServer.on( 'data', this.routeFromGameToWSClient )
        this.wsServer.on( 'connection', this.connectWSClient )
        // this.gameServer.on('close', this.closeConnection )
    }

    start() {
        this.httpServer.listen( this.HTTP_PORT, () =>
            console.info( `Http Server is listening on port ${ this.HTTP_PORT }` ) )
    }

    closeConnection() {
        // this.w
    }

    routeFromGameToWSClient( data: Buffer ): void {
        console.info( 'Received message from game server.' )
        console.log(data)

        const parsedData = JSON.parse( data.toString().trim() )
        console.log( parsedData )

        const { scope, clientID } = parsedData
        if ( scopeIsGlobal( scope ) ) {
            Object.values( this.wsClients )
                .forEach( ( client: WebSocket ): void =>
                    client.send( data ) )
        } else if ( clientID ) {
            this.sendToWSClient( { clientID, message: parsedData } )
        }
    }

    connectWSClient( ws: WebSocket ): void {
        const clientID = uuidv4();
        this.addWSClient( { clientID, client: ws } )

        console.log( `New client connected and assigned ID: ${ clientID }` )
        this.handshakeWSClient( { clientID } )
        // comepleteConnectionWithClient( { clientID, connection: ws } )
        ws.on( 'message', this.routeFromClientToGame )
    }

    handshakeWSClient( { clientID } ) {
        const message = {
            clientID,
            scope: 'global',
            type: 'connection_handshake',
            content: clientID,
        }
        console.log( 'Handshaking with client...' )
        this.sendToWSClient( { clientID, message } )
    }

    routeFromClientToGame( data: Buffer ) {
        console.info( 'Message received from client.' )
        console.log( data )

        console.info( 'Sending message to game server...' )
        this.gameServer.write( data )
    }

    sendToWSClient( { clientID, message } ) {
        const client = this.getWSClient( { clientID } )
        //FIXME: Also validate the message data here too
        client.send( JSON.stringify( message ) );
    }

    getWSClient( { clientID } ) {
        const client = this.wsClients[ clientID ]
        if ( client ) {
            return client
        } else {
            throw new Error( `No client with ID ${ clientID } found.` )
        }
    }

    addWSClient( { clientID, client } ) {
        console.log( 'Adding client with ID ' + clientID )
        this.wsClients[ clientID ] = client;
    }

}

const httpServer = new HttpServer()
httpServer.start()


function scopeIsGlobal( scope ) {
    return scope === 'global'
}