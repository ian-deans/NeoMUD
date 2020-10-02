const Zone = require( './Zone' )

class Game {
    constructor({ isServer }) {
        //common
        this.active = false
        this.upSince = new Date()

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

    createZone( zoneData ) {
        if ( !zoneData ) {
            const message = 'must include zone data when creating a zone.'
            process.emit( 'error', { message } )
            return
        }

        const zone = new Zone( zoneData )
        this.zones[ zone.uid ] = zone
    }

    start() {
        this.active = true;
        
    }
}

module.exports = Game