const { v4: uuid } = require( "uuid" )
const EventEmitter = require( 'events' )

class Room {
    constructor( { uid, title, description } ) {
        this.uid = uid ? uid : uuid()
        this.title = title
        this.description = description
        this.exits = {}
        this.occupants = {}
        this.objects = {}
        this.events = new EventEmitter()

        this.getOccupants = this.getOccupants.bind( this )

    }

    info() {
        return {
            uid: this.uid,
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
        this.occupants[ actor.uid ] = actor

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
        const { uid, title, description, exits } = this
        const exitJSONS = {}
        Object.keys( exits ).forEach( direction => {
            exitJSONS[ direction ] = exits[ direction ].uid
        } )
        return { uid, title, description, exits: exitJSONS }
    }





}

module.exports = Room

/**
 * have title, descriptions, list of occupants, list of exits,
 *
 */