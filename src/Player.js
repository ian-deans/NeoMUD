const Actor = require( './Actor' )

class Player extends Actor {
    constructor( data ) {
        super( data )
    }

    look() {
        const { title, description, exits, occupants, objects } = this.location.info()

        const roomOccupants = occupants.filter( occupant => occupant.uid !== this.uid )
        return console.log( `
 ${ title.toUpperCase() }
 ${ description }

    ${ roomOccupants.map( occupant => `${ occupant.longDescription }\n` ) }
    ${ objects.map( object => `${ object.longDescription }\n` ) }
 exits: ${ exits }
            `)
    }

    move( direction ) {
        const nextRoom = this.location.getNext( direction )
        this.location.removeOccupant( this )
        this.updateLocation( nextRoom )
        this.location.addOccupant( this )
    }
}

module.exports = Player

/**
 * player enters room
 * room adds player
 */

function handleSay( { speaker, content } ) {
    console.log( `${ speaker } says, "${ content }"` )
}