import { IActorConfig } from '@common/interfaces'
/**
 * Actor is the base class for all characters and creatures 
 * in the game. From actual players to killer bunny rabbits
 */


export default class Actor {
    name: string
    shortDescription: string
    longDescription: string
    roomUUID: string
    zoneUUID: string

    constructor( { name, shortDescription, longDescription, zoneUUID, roomUUID }: IActorConfig ) {
        this.name = name
        this.shortDescription = shortDescription
        this.longDescription = longDescription
    
        this.updateLocation = this.updateLocation.bind( this )
        this.updateLocation({ zoneUUID, roomUUID })
    }

    updateLocation( { zoneUUID, roomUUID } ): void {
        // TODO: Add error handlign for invalid room or zone uuids
        this.roomUUID = roomUUID
        this.zoneUUID = zoneUUID
    }

    getLocation(): Array<string> {
        return [ this.zoneUUID, this.roomUUID ]
    }
}


/**
 * Interface for Actor locations 
 * [ zone_uid, room_uid ]
 */
