import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import Game from './src/Game';

process.title = 'Game Alpha';

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer( app );
const wss = new WebSocket.Server( { server } );

function serverMessageHandler( data ) {
    if ( data.type === 'player-login' ) {
        
    }
}

wss.on( 'connection', connectClient )

function handleIncomingData( data, ws ) {

    const parsedData = JSON.parse( data.toString() )
    const { scope, type, clientID } = JSON.parse( data.toString() );

    switch ( scope ) {
        case 'global': {
            serverMessageHandler( parsedData )
        },
        case 'local': { },
    }

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

    // if ( cmd === 'chat' ) {
    //     const chatString = `[chat]${ player.name }> "${ params.join( " " ) }"`
    //     chat.send( chatString )
    // }

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
    globalBroadcast( 'A player has connected.' )
    

    // Get character name from user
    // Find player data matching given name
    // if found
    // Create a player instance with data
    // load player into zone/room saved in player data
    // else
    // create new character




    ws.on( 'message', data => handleIncomingData( data, ws ) )
}

server.listen( PORT, () => {
    console.log( `Server up on port ${ PORT }.` )
} )

function globalBroadcast( data ) {
    wss.clients.forEach( client => {
        const message = JSON.stringify( {
            scope: 'global',
            type: 'event',
            content: data,
        })
    })
}