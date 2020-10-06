const events = require( 'events' )

class Channel extends events.EventEmitter {
    constructor( name ) {
        super()
        this.name = name;
    }

    subscribe() {
        return this.on( 'chat', function ( message ) {
            return message;
        } )
    }

    send( message ) {
        this.emit( 'chat', message )
    }


}


const chatChannel = new Channel( 'chat' )


chatChannel.send( "This is a chat message!" )

let count = 0;
setInterval( function () {
    chatChannel.send( 'Chat message ' + ++count )
}, 5000 )


export const chat = chatChannel