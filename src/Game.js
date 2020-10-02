const Zone = require( './Zone' )

class Game {
    constructor( { isServer } ) {
        //common
        this.active = false
        this.upSince = new Date()
        this.tickInterval = null
        this.tickLength = 3000

        if ( isServer ) {
            this.playerList = {}
            this.zones = {}
        } else {
            this.player = null
        }

        process.on( 'error', function ( { message } ) {
            console.error( message )
        } )
    }

    addZone( zoneData ) {
        if ( !zoneData ) {
            const message = 'must include zone data when creating a zone.'
            process.emit( 'error', { message } )
            return
        }

        const zone = new Zone( zoneData )
        this.zones[ zone.uid ] = zone
        return zone.uid
    }

    start() {
        this.active = true
        while ( active ) {
            this.tickInterval = setInterval( function () {
                process.emit( 'tick', { time: new Date() } )
            }, tickLength )
        }
    }

    getZones() {
        return Object.values(this.zones)
    }
}

module.exports = Game