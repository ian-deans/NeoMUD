import { v4 as uuidv4 } from 'uuid';

/**
 * Actor is the base class for all characters and creatures 
 * in the game. From actual players to killer bunny rabbits
 */


export default class Actor {
    uuid: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    room_uid: string;
    zone_uid: string;

    constructor( { uuid, name, shortDescription, longDescription } ) {
        this.uuid = uuid ? uuid : uuidv4();
        this.name = name;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
    }

    updateLocation( { zone_uid, room_uid }: ILocation ) {
        this.room_uid = room_uid;
        this.zone_uid = zone_uid;
    }

    getLocation() {
        return [ this.zone_uid, this.room_uid ];
    }
}


/**
 * Interface for Actor locations 
 * [ zone_uid, room_uid ]
 */

interface ILocation {
    zone_uid: string;
    room_uid: string;
}