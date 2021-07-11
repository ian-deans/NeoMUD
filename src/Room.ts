import { v4 as uuidv4 } from 'uuid'
import { EventEmitter } from 'events'
import Channel from './Channel'

interface IRoom {
    uuid: string
    title: string
    description: string
}

/**
 * Represents a single space within the world. A room can house players,
 * NPCs, and items ( weapons, armor, furnirture ) and maintains an event
 * emitter.
 */

export default class Room {
    uuid: string
    title: string
    description: string
    exits: any
    occupants: any
    objects: any
    events: any
    respawnPoints: any[]
    say: any
    
    constructor( { uuid, title, description }: IRoom ) {
        this.uuid = uuid ? uuid : uuidv4()
        this.title = title
        this.description = description
        this.exits = {}
        this.occupants = {}
        this.objects = {}
        this.events = new EventEmitter()
        this.say = new Channel( 'say' )

        this.getOccupants = this.getOccupants.bind( this )
    }

    info() {
        return {
            uuid: this.uuid,
            title: this.title,
            description: this.description,
            exits: Object.keys( this.exits ),
            occupants: Object.values( this.occupants ),
            objects: Object.values( this.objects ),
        }
    }

    attachListeners() {
        // Add listeners for: say, event, 
    }

    addOccupant( actor ) {
        // takes an actor object as argument and adds to occupants hashmap
        this.occupants[ actor.uuid ] = actor
    }

    removeOccupant() {
        // takes an actor name and deletes it from the occupants hashmap
        // TODO: Dont mutate data
        // look into not mutating occupants but replaceing with modified copy
    }

    getOccupants() {
        // Get long description of all occupants and return in an array
        // TODO: Dont mutate data
    }

    connect( { direction, room } ) {
        // if valid direction
        this.exits[ direction ] = room
    }

    getNext( direction ) {
        return this.exits[ direction ]
    }

    setTitle( content ) {
        this.title = content
    }

    updateDescription( content ) {
        this.description = content
    }

    exportJSON() {
        const { uuid, title, description, exits } = this
        const exitJSONS = {}
        Object.keys( exits ).forEach( direction => {
            exitJSONS[ direction ] = exits[ direction ].uuid
        } )
        return { uuid, title, description, exits: exitJSONS }
    }
}
