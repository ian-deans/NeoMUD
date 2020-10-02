const Game = require( './Game' )

process.title = 'Beta Game'

/**
 * main loop where game is running,
 * maintains the Zone which holds the rooms.
 * has user create a character then puts them into the zone's first room.
 * 
 */





// const zoneJSON = { "uid": "5135759d-b23c-4cb4-b16f-d7d992654aaa", "name": "Test Zone", "rooms": [ { "23c68fee-0aca-45de-87b4-d3f8a95a5246": { "uid": "23c68fee-0aca-45de-87b4-d3f8a95a5246", "title": "First Room", "description": "A plain and boring room.", "exits": [ { "NORTH": "34d04f4d-8def-4c62-b611-af1829fae250" } ] } }, { "34d04f4d-8def-4c62-b611-af1829fae250": { "uid": "34d04f4d-8def-4c62-b611-af1829fae250", "title": "Second Room", "description": "Another plain room", "exits": [ { "SOUTH": "23c68fee-0aca-45de-87b4-d3f8a95a5246" }, { "WEST": "71ac1692-a8cb-4a60-918e-25ad8aa5f9f6" } ] } }, { "71ac1692-a8cb-4a60-918e-25ad8aa5f9f6": { "uid": "71ac1692-a8cb-4a60-918e-25ad8aa5f9f6", "title": "Room 3", "description": "A dope ass room?", "exits": [ { "EAST": "34d04f4d-8def-4c62-b611-af1829fae250" } ] } } ] }
const zoneData = { "uid": "4c8cfc84-73f9-48b3-880f-bcf1a7ef2b4c", "name": "Test Zone", "rooms": [ { "uid": "3cf0e1ba-655d-46f2-8dda-9b8fbbe4ee24", "title": "First Room", "description": "A plain and boring room.", "exits": [ { "NORTH": "2b201c94-388e-469a-8b4b-f83be894727e" } ] }, { "uid": "2b201c94-388e-469a-8b4b-f83be894727e", "title": "Second Room", "description": "Another plain room", "exits": [ { "SOUTH": "3cf0e1ba-655d-46f2-8dda-9b8fbbe4ee24" }, { "WEST": "5ab6edd5-f349-4315-a81b-34f54f1f4efa" } ] }, { "uid": "5ab6edd5-f349-4315-a81b-34f54f1f4efa", "title": "Room 3", "description": "A dope ass room?", "exits": [ { "EAST": "2b201c94-388e-469a-8b4b-f83be894727e" } ] } ] }

const game = new Game({ isServer: true })

game.createZone( zoneData )

console.info( game )

// const zone = new Zone( zoneData )

// const zone = new Zone( { name: 'Test Zone' } )
// zone.addRoom( { title: 'First Room', description: 'A plain and boring room.' } )
// zone.addRoom( { title: 'Second Room', description: 'Another plain room', direction: 'NORTH' } )
// zone.move( 'NORTH' )
// zone.addRoom( { title: 'Room 3', description: 'A dope ass room?', direction: 'WEST' } )
// zone.move( 'SOUTH' )

// console.log( zone.exportJSON() )



console.log( `
Beta Game Testing


What is your name?

`)

// Listen to use input
process.stdin.on( 'data', data => {
    const args = data.toString().trim().split( ' ' )
    const command = args.shift()
    const params = args.pop()

    handleCommands( { command, params } )
} )




// function handleCommands( { command, params } ) {
//     function lookInRoom() {
//         const { title, description, exits } = zone.currentRoom.info()
//         return console.log( `
//     ${ title.toUpperCase() }
//     ${ description }
    
    
//     exits: ${ exits }
//         `)

//     }
//     switch ( command ) {
//         case 'l':
//         case 'look': {
//             return lookInRoom()
//         }

//         case 'say': {
//             return console.log( `You say, "${ params }"` )
//         }

//         case 'exit': {
//             return process.exit()
//         }

//         case 'move': {
//             const direction = params.toUpperCase()
//             zone.move( direction )
//             console.log( `You walk ${ params }.` )
//             lookInRoom()
//             return
//         }

//         default: {
//             console.log( 'Shwhat?' )
//         }
//     }
// }