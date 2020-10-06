import { client as WebSocketClient } from 'websocket';
import { v4 as uid } from 'uuid';

const [ , , playerName = 'Ian' ] = process.argv;

const client = new WebSocketClient()
const _clientID = uid();

let _playerUID;

function _socketData( { playerUid, } ) {
    return JSON.stringify( {

    })
}


client.on( 'connectFailed', function ( error ) {
    console.log( 'Connect Error: ' + error.toString() );
} );

client.on( 'connect', function ( connection ) {
    console.log( 'Connected to server...' );


    connection.send( JSON.stringify( {
        type: 'player-login',
        playerName,
        clientID: _clientID,
    }))

    connection.on( 'error', function ( error ) {
        console.log( "Connection Error: " + error.toString() );
    } );
    connection.on( 'close', function () {
        console.log( 'echo-protocol Connection Closed' );
        process.exit()
    } );

    connection.on( 'message', function ( message ) {
        if ( message.type === 'utf8' ) {

            const data = JSON.parse( message.utf8Data.toString() )
            const { clientID, type, content, } = data;

            if ( type === 'player-login' ) {
                const { playerUID } = data;
                _playerUID = playerUID;
                return
            }
            
            if ( type === 'communication' ) {
                console.log(content)
            }
            
        }
    } );

    // const data = JSON.stringify( { tag: 'chat', content: 'This is a message' } )

    // connection.send( data )


    process.stdin.on( 'data', data => {
        const command = data.toString().trim();

        const socketData = {
            clientID: _clientID,
            playerUID: _playerUID,
            command
        }

        connection.send( JSON.stringify( socketData ) )


    } )
} );

client.connect( 'ws://localhost:5000/', 'echo-protocol' );
