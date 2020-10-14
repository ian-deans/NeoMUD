require( 'dotenv' ).config()
import express from 'express'
import http from 'http'
import WebSocket from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { createConnection } from 'net'

process.title = 'http_ws_server'

class HttpServer {
    HTTP_PORT: number
    GAME_PORT: number
    wsClients: any
    httpServer: any
    wsServer: any
    gameServer: any

    constructor() {
        this.HTTP_PORT = parseInt( process.env.WEB_SOCKET_SERVER_PORT )
        this.GAME_PORT = parseInt( process.env.GAME_SERVER_PORT )
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
    }

    start() {
        this.httpServer.listen( this.HTTP_PORT, () =>
            console.info( `Http Server is listening on port ${ this.HTTP_PORT }` ) )
    }

    routeFromGameToWSClient( data ) {
        console.info( 'Received message from game server.' )

        const parsedData = JSON.parse( data.toString().trim() )
        console.log( parsedData )

        const { clientID } = parsedData
        this.sendToWSClient( { clientID, message: parsedData } )
    }

    connectWSClient( ws ) {
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

    routeFromClientToGame( data ) {
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


// const HTTP_PORT = process.env.WEB_SOCKET_SERVER_PORT || 5000
// const GAME_PORT = process.env.GAME_SERVER_PORT
// const clients = {}

// const app = express()
// const httpServer = http.createServer( app )
// const wss = new WebSocket.Server( { server: httpServer } )

// const gameServer = createConnection( { port: parseInt( GAME_PORT ) }, () => {
//     console.log( 'Connection to game server esablished on port ' + GAME_PORT )
// } )

// gameServer.write( JSON.stringify( {
//     scope: 'global',
//     type: 'test',
//     content: 'TESTING'
// } ) )

// gameServer.on( 'data', function ( data ) {
//     const parsedData = JSON.parse( data.toString().trim() )
//     console.info( 'Received message from game server.' )
//     console.log( parsedData )
//     const client = clients[ parsedData.clientID ]
//     if ( client ) {
//         console.info( 'Sending to client ' + parsedData.clientID )
//         client.send( data )
//     }
// } )

// wss.on( 'connection', function connectClient( ws ) {
//     const isOpen = client => client !== ws && client.readyState === WebSocket.OPEN
//     const clientID = uuidv4()

//     addClient( { clientID, connection: ws } )
//     console.log( `New client connected and assigned ID: ${ clientID }` )
//     comepleteConnectionWithClient( { clientID, connection: ws } )

//     ws.on( 'message', data => handleIncomingData( data, ws ) )
// } )

// function 

// function connectClient( ws ) {
//     const isOpen = client => client !== ws && client.readyState === WebSocket.OPEN

//     const clientID = uuidv4()
//     ws.name = clientID

//     addClient( { clientID, connection: ws } )
//     console.log( `New client connected and assigned ID: ${ clientID }` )
//     comepleteConnectionWithClient( { clientID, connection: ws } )

//     ws.on( 'message', data => handleIncomingData( data, ws ) )
// }

// // UTILITIES
// function globalBroadcast( data ) {
//     wss.clients.forEach( client => {
//         const message = JSON.stringify( {
//             scope: 'global',
//             type: 'event',
//             content: data,
//         } )
//     } )
// }

// function addClient( { clientID, connection } ) {
//     clients[ clientID ] = connection
// }

// function getClientConnection( { clientID } ) {
//     const client = clients[ clientID ]
//     if ( !client ) {
//         console.error( `No client connection found with clientID: ${ clientID }` )
//     }
// }

// function comepleteConnectionWithClient( { clientID, connection } ) {
//     const message = JSON.stringify( {
//         scope: 'global',
//         type: 'connection_handshake',
//         content: clientID,
//     } )
//     connection.send( message )
// }


// httpServer.listen( HTTP_PORT, () => {
//     console.log( `Server up on port ${ HTTP_PORT }.` )
// } )
