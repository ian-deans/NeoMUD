import { EventEmitter } from 'events'


export default class Channel extends EventEmitter {
    private name: string

    constructor( name ) {
        super()
        this.name = name
    }

    subscribe( cb ) {
        return this.on( this.name, cb )
    }

    send( message ) {
        this.emit( this.name, message )
    }


}
