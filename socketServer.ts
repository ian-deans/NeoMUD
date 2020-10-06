import net from 'net';

const server = net.createServer( ( socket ) => {
    socket.on( 'data', data => {
        // const command = JSON.parse( data.toString() );
        const command = data.toString().trim()

        const json = JSON.parse( command )
        console.log( json )
    } )

    socket.write( 'SERVER: Hello this is the server!' )
    // socket.end('SERVER Closing Connection now')
} ).on( 'error', error => {
    console.error( error )
} )

server.listen( 5000, () => {
    console.log('Socket server started on port 5000' )
})