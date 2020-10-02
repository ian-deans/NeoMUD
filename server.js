const Game = require( './src/Game' )
const zoneJSON = require( './saved/zones/zone-test-zone.json' )
const DIRECTIONS = require( './constants/directions' )

const Player = require( './src/Player' )
const NPC = require( './src/NPC' )

process.title = 'Game Alpha'

/**
 * main loop where game is running,
 * maintains the Zone which holds the rooms.
 * has user create a character then puts them into the zone's first room.
 * 
 */


const game = new Game( { isServer: true } )
const zoneUid = game.addZone( zoneJSON )
// game.zones[ zoneUid ].save()

const firstRoom = game.zones[ zoneUid ].rooms[ '8ee6ad6d-75aa-412c-8981-f80e3f6a4d0d' ]
console.log( firstRoom )


const doodData = {
    name: 'El Dood',
    shortDescription: 'a tall man',
    longDescription: 'A tall man with a hat is standing here, looking at you.'
}
const player = new Player( doodData )
player.updateLocation( firstRoom )
firstRoom.addOccupant( player )

const goblinData = {
    name: 'a goblin',
    shortDescription: 'a small green creature',
    longDescription: 'A small, dirty looking, green-skinned creature is squatting nearby.',
}

const goblin = new NPC( goblinData )

goblin.updateLocation(firstRoom)
firstRoom.addOccupant(goblin)


console.log( `
Alpha Game Testing


`)

// Listen to use input
process.stdin.on( 'data', data => {
    const args = data.toString().trim().split( ' ' )
    const command = args.shift()
    const params = args.pop()

    handleCommands( { command, params } )
} )




function handleCommands( { command, params } ) {

    switch ( command ) {
        case 'l':
        case 'look': {
            return player.look()
        }

        case 'say': {
            return console.log( `You say, "${ params }"` )
        }

        case 'exit': {
            return process.exit()
        }

        case 'move': {
            const direction = params.toUpperCase()

            if ( !DIRECTIONS[ direction ] ) {
                process.emit( 'error', { message: 'Not a valid direction!' } )
                return
            }

            player.move( direction )
            console.log( `You walk ${ params }.` )
            // lookInRoom()
            return
        }

        default: {
            console.log( 'Shwhat?' )
        }
    }
}