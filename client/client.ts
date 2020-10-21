require( 'dotenv' ).config()
import "module-alias/register"
import WebSocket from 'ws'
import { HTTP_PORT, HTTP_URL } from "@common/config"

/**
 * Client program for connecting to and interacting with the game
 */


class GameClient {
    clientID: string | null
    ws: any

    constructor() {
        this.clientID = null
        this.ws = new WebSocket( `${ HTTP_URL }:${ HTTP_PORT }` )

        this.handleIncomingMessage = this.handleIncomingMessage.bind( this )
        this.sendMessageToServer = this.sendMessageToServer.bind( this )
        this.handleError = this.handleError.bind( this )
        this.handleOpen = this.handleOpen.bind( this )
        this.handleClose = this.handleClose.bind( this )
        this.attachListeners = this.attachListeners.bind( this )

        this.attachListeners()


        process.stdin.on( 'data', data => {
            const command = data.toString().trim()

            if ( !this.clientID ) {
                console.error( 'No ID received from server.' )
            } else {


                const messageData = {
                    clientID: this.clientID,
                    type: 'command',
                    content: command,
                }

                this.sendMessageToServer( messageData );
            }
        } )

    }

    attachListeners() {
        this.ws.on( 'message', this.handleIncomingMessage )
        this.ws.on( 'error', this.handleError )
        this.ws.on( 'open', this.handleOpen )
        this.ws.on( 'close', this.handleClose )
    }

    handleClose() {
        console.info( 'Connection to game server terminated.' )
        process.exit()
    }

    handleOpen() {
        console.info( 'Connection with server established at ' + process.env.SERVER_URL )
    }

    handleError( err ) {
        console.info( 'Error received from server.' )
        console.error( err )
    }

    handleIncomingMessage( message ) {
        console.log( 'Message received from http server.' )

        const data = JSON.parse( message )
        console.log( data )

        if ( data.type === 'connection_handshake' ) {
            console.info( 'ID received from server: ' + data.content )
            this.clientID = data.content
        } else {
            console.info( 'other command' )
        }
    }

    sendMessageToServer( message ) {
        console.info( 'Sending message to server: ' )
        console.log( message )
        this.ws.send( JSON.stringify( message ) )
    }

}


const client = new GameClient()
