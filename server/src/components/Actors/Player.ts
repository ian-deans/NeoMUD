import { Socket } from "net"
import Actor from "@components/Actors/Actor"

/**
 * Class that handles Players and how they can interact with the game.
 * 
 * two types of methods? for interaction via the websocket messages,
 * websocket methods return a return message to send back to the client.
 */

export default class Player extends Actor {
    uuid: string
    clientID: string

    constructor( data ) {
        super( data )
        this.uuid = data.uuid
        this.clientID = data.clientID
    }

    get location() {
        return {
            info: function () {
                
            }
        }
    }

    look() {
        const { title, description, exits, occupants, objects } = this.location.info()

        const roomOccupants = occupants.filter( occupant => occupant.uuid !== this.uuid )
        return console.log( `
 ${ title.toUpperCase() }
 ${ description }

    ${ roomOccupants.map( occupant => `${ occupant.longDescription }\n` ) }
    ${ objects.map( object => `${ object.longDescription }\n` ) }
 exits: ${ exits }
            `)
    }

    move( direction ) {
        // const nextRoom = this.location.getNext( direction )
        // this.location.removeOccupant( this )
        // this.updateLocation( nextRoom )
        // this.location.addOccupant( this )
    }
}

