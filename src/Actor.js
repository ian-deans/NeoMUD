const { v4: uuid } = require( 'uuid' )

class Actor {
    constructor( { name, shortDescription, longDescription } ) {
        this.uid = uuid()
        this.name = name
        this.shortDescription = shortDescription
        this.longDescription = longDescription
        this.location = null

        this.hp = {
            current: 10,
            max: 10,
        }

    }

    updateLocation( room ) {
        this.location = room
    }

    getLocation() {
        return this.location
    }

    say( content ) {
        this.location.events.emit( 'say', { speaker: this.uid, content } )
    }
}

module.exports = Actor