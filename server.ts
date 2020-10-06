import express from 'express';
import http from 'http';
// import { server as WebSocketServer } from 'websocket';
import WebSocket from 'ws';

import { chat } from "./src/Channel"

process.title = 'Game Alpha'

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer( app );
const wss = new WebSocket.Server( { server } )

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
}


wss.on( 'connection', connectClient )

chat.on( 'chat', message => {
    console.log('--> Chat event detected, sending to clients.')
    wss.clients.forEach( client => {
        client.send( JSON.stringify( {
            scope: 'global',
            type: 'communication',
            content: message
        } ) )
    } )
} )


function handleIncomingData( data, ws ) {
    const parsedData = JSON.parse( data.toString() )
    const { type, clientID } = JSON.parse( data.toString() );

    if ( type === 'player-login' ) {
        const { playerName } = parsedData;
        const player = Object.values( players ).find( player => player.name === playerName )
        players[ player.uid ].clientID = clientID;
        players[ player.uid ].socket = ws;
        ws.send( JSON.stringify( {
            type: 'player-login',
            playerUID: player.uid,
        } ) )
        return
    }


    const { command, playerUID } = parsedData;
    const player = players[ playerUID ];
    const [ cmd, ...params ] = command.split( " " );

    if ( cmd === 'chat' ) {
        const chatString = `[chat]${ player.name }> "${ params.join( " " ) }"`
        chat.send( chatString )
    }

    if ( cmd === 'say' ) {
        const roomID = player.roomID;
        const sayString = `${ player.name } says, "${ params.join( " " ) }"`

        // global.players[player.uid].location.emit('say', 'stuff')
        const returnData = JSON.stringify( {
            clientID,
            type: 'communication',
            content: sayString,
        } )

        Object.values( players )
            .filter( player => player.roomID === roomID )
            .filter( player => player.socket !== null )
            .forEach( playerInRoom => playerInRoom.socket.send( returnData ) )

    }
}

function connectClient( ws ) {
    const isOpen = client => client !== ws && client.readyState === WebSocket.OPEN;

    console.log( 'client connected' )

    wss.clients.forEach( client => {
        if ( isOpen( client ) ) {
            const eventString = `A player has logged in.`
            client.send( JSON.stringify( {
                scope: 'global',
                type: 'event',
                content: eventString,
            } ) )
        }
    } )

    ws.on( 'message', data =>  handleIncomingData(data, ws) )
}

server.listen( PORT, () => {
    console.log( `Server up on port ${ PORT }.` )
} )

