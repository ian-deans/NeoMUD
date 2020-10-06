const Actor = require( './Actor.ts' )
import { Socket } from "net";

class Player extends Actor {
    clientID: string;
    socket: Socket | null;

    constructor( {clientID, ...baseData} ) {
        super(  baseData )
        this.clientID = clientID;
        this.socket = null;
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

class Location {
    constructor() {
        this.zone
        this.room


    }

    getUids() {
        return { zone: this.zone.uid, room: this.room.uid } 
    }
}

/**
 * player enters room
 * room adds player
 */

function handleSay( { speaker, content } ) {
    console.log( `${ speaker } says, "${ content }"` )
}