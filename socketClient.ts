import net from 'net';

const client = net.createConnection( { port: 5000 }, () => {
    console.log( 'CLIENT: I connected to the server' )
    // client.write( 'CLIENT: Hello this is the client' )
} );

client.on( 'data', data => {
    console.log( data.toString() );
} )

client.on( 'end', () => {
    console.log( 'CLIENT: Connection terminated.' )
    process.exit()
} )

process.stdin.on( 'data', data => {
    const command = JSON.stringify( {
        player: '3r123r-3r1r1',
        location: [ '213f-3211e1', '21r1s-223g12' ],
        command: data.toString().trim(),
    })
    client.write( command );
} )
