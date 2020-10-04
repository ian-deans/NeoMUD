const { v4: uuid } = require( 'uuid' );
const EventEmitter = require('events');

class Actor {
    protected uid: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    location: Coordinates;

    constructor( { uid, name, shortDescription, longDescription } ) {
        this.uid = uid ? uid : uuid()
        this.name = name
        this.shortDescription = shortDescription
        this.longDescription = longDescription
        this.location = new Coordinates();
    }

    updateLocation(coords: ICoordinates) {
        this.location.update(coords)
    }

    getLocation() {
        return this.location
    }

    say( content ) {
        this.location.events.emit( 'say', { speaker: this.uid, content } )
    }
}

module.exports = Actor


interface ICoordinates {
    zoneUid: string;
    roomUid: string;
}

// Represents an item or actors location in the world.
// the first value is the zone uid, and the second is the room uid
//  Coordinates [ a4fd-24h3, b3a5-9f93 ] = [ zoneUid, roomUid ]
class Coordinates {
    private zoneUid: string;
    private roomUid: string;
    private events: EventEmitter;
    
    constructor({ zoneUid = null, roomUid = null, events = null }: ICoordinates) {
        this.zoneUid = zoneUid;
        this.roomUid = roomUid;
        
    }

    update({zoneUid, roomUid}: ICoordinates) {
        this.zoneUid = zoneUid;
        this.roomUid = roomUid;
    }

    get() {
        return [ this.zoneUid, this.roomUid ]
    }
}


// game.zones[ coords[ 0 ] ].rooms[ coords[ 1 ]]