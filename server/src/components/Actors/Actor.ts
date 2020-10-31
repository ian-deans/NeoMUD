import { IActorConfig } from '@common/interfaces'
import Room from '@components/Room'
/**
 * Actor is the base class for all characters and creatures
 * in the game. From actual players to killer bunny rabbits
 */


export default class Actor {
    name: string
    shortDescription: string
    longDescription: string
    private roomUUID: string | null
    private zoneUUID: string | null
    private location: Room | null

    constructor( { name, shortDescription, longDescription, location }: IActorConfig ) {
        this.name = name
        this.shortDescription = shortDescription
        this.longDescription = longDescription

        this.updateLocation = this.updateLocation.bind( this )
        this.updateLocation( location )
    }

    updateLocation( room: Room ): void {
        const roomIsValid = true //TODO: make this actually do something
        if ( roomIsValid ) {
            this.location = room
            // this.zoneUUID = room.getZoneUUID()
            // this.roomUUID = room.getUUID()
        } else {
            //TODO: do something else?
        }

    }

    get coordinates(): string[] {
        return [ this.zoneUUID, this.roomUUID ]
    }

    getLocation(): Room {
        return this.location
    }
}













/**
 * Interface for Actor locations
 * [ zone_uid, room_uid ]
 */
