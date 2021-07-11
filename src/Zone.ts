import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import Room from './Room';
import { Directions } from '../constants/directions';
import { directionOppositeOf } from '../util'


interface IZone {
    uuid: string;
    name: string;
    rooms: any;
}

/**
 * Maintains a collection of rooms
 */

export default class Zone {
    uid: string;
    name: string;
    players: any;
    rooms: any;

    constructor( { uuid, name, rooms }: IZone ) {
        this.uid = uuid ? uuid : uuidv4()
        this.name = name
        this.players = {}
        // this.currentRoom = null
        this.rooms = rooms ? this.loadRooms( rooms ) : {}

        // this.addRoom = this.addRoom.bind( this )
        // this.move = this.move.bind( this )
        this.loadRooms = this.loadRooms.bind( this )
    }

    _listeners() {
        /** 
         * global
         * chat 
         * 
         * zone events
         * player_enters, player_leaves, yell
         */
        process.on( 'zone_player_enters', ( { zoneUid, playerUid } ) => {
            if ( zoneUid !== this.uid ) {
                return
            }


        } )
    }

    // addRoom( { title, description, direction } ) {

    //     const room = new Room( { title, description } )

    //     this.rooms[ room.uid ] = room


    //     if ( !this.startRoom ) {
    //         this.startRoom = room
    //         this.currentRoom = this.startRoom
    //     } else {
    //         if ( !direction ) {
    //             process.emit( 'error', { message: 'Need a direction to create a new room' } )
    //         }
    //         room.connect( { direction: directionOppositeOf( direction ), room: this.currentRoom } )
    //         this.currentRoom.connect( { direction, room } )
    //     }
    // }

    addPlayer( player ) {
        this.players[ player.uid ] = player
    }

    getRoom( uid ) {
        const room = this.rooms[ uid ]

        if ( !room ) {
            const message = `Can not find room with uid: ${ uid } in zone: ${ this.name }.`
            throw new Error('message')
        }
    }

    connectRooms( { fromUid, toUid, direction } ) {

        const fromRoom = this.rooms[ fromUid ]
        const toRoom = this.rooms[ toUid ]
        const oppositeDirection = directionOppositeOf( direction )

        if ( fromRoom && toRoom ) {
            fromRoom.connect( { room: toRoom, direction } )
            toRoom.conenct( { room: fromRoom, direction: oppositeDirection } )
        }
    }

    exportJSON() {
        const { uid, name, rooms } = this
        const roomJSONS = Object.keys( rooms ).map( uid => {
            return rooms[ uid ].exportJSON()
        } )

        return JSON.stringify( {
            uid,
            name,
            rooms: roomJSONS,
        } )
    }
    save() {
        //TODO: write json data to file.
        const fileName = `zone-${ this.name.replace( ' ', '-' ).toLowerCase() }.json`
        const json = this.exportJSON()
        fs.writeFileSync( fileName, json )
    }

    loadRooms( roomsData ) {
        const rooms = {}

        // create all rooms without exits
        roomsData.forEach( roomData => {
            rooms[ roomData.uid ] = new Room( roomData )
        } )

        // connect the rooms
        roomsData.forEach( roomData => {
            const currentRoom = rooms[ roomData.uid ]
            const directions = Object.keys( roomData.exits )

            directions.forEach( direction => {
                const targetRoomUid = roomData.exits[ direction ]
                const targetRoom = rooms[ targetRoomUid ]
                currentRoom.connect( { direction, room: targetRoom } )
            } )
        } )

        return rooms
    }
}
