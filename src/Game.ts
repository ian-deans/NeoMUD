import Zone from './Zone'
import Player from "./Player"
import { EventEmitter } from 'events'
import Channel from './Channel'


/**
 * get zone data from db
 * instantiate zones 
 *   instantiate rooms
 *      connect rooms' exits
 * 
 * get item data from db
 *  trigger respawn points in rooms to spawn items and NPCs
 * 
 * get player data from db
 *  await connections to instantiate player objects
 * 
 * 
 */
interface IZoneList {
    [ zone_uid: string ]: typeof Zone
}

interface IPlayerList {
    [ player_uid: string ]: typeof Player
}

/**
 * Main class for the game itself. Holds the zones in a collection and maintains
 * a list of connected players.
 */

export default class Game {
    active: boolean
    tickLength: number
    tickInterval: any
    upSince: Date
    zones: any
    players: any
    globalEvent: any
    chat: any

    constructor( config ) {
        //common
        this.active = false
        this.upSince = new Date()
        this.tickInterval = null
        this.tickLength = 3000
        this.players = {}
        this.zones = {}
        this.globalEvent = new EventEmitter()
        this.chat = new Channel( 'chat' )

        process.on( 'error', function ( { message } ) {
            console.error( message )
        } )
    }

    addZone( zoneData ) {
        if ( !zoneData ) {
            const message = 'must include zone data when creating a zone.'
            throw new Error( message )
        }

        const zone = new Zone( zoneData )
        this.zones[ zone.uid ] = zone
        return zone.uid
    }

    start() {
        this.active = true
        while ( this.active ) {
            this.tickInterval = setInterval( function () {
                this.globalEvent.emit( 'tick', { time: new Date() } )
            }, this.tickLength )
        }
    }

    activate() {
        this.active = true
    }

    deactivate() {
        this.active = false
    }

    getZones() {
        return Object.values( this.zones )
    }

    getZone( uuid ) {
        return this.zones[ uuid ];
    }

    getPlayer( uuid ) {
        return this.players[ uuid ];
    }
}
