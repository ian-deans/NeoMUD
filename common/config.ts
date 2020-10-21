const rGAME_PORT: number | string = process.env.GAME_PORT || 5050
const rHTTP_PORT: string | number = process.env.HTTP_PORT || 5000

let GAME_PORT: number;
let HTTP_PORT: number;

console.log(typeof GAME_PORT, 'GAME')
console.log(typeof HTTP_PORT, 'HTTP')

if ( typeof rGAME_PORT === 'string' ) {
    GAME_PORT = parseInt( rGAME_PORT, 10 )
} else {
    GAME_PORT = rGAME_PORT
}

if ( typeof rHTTP_PORT === 'string' ) {
    HTTP_PORT = parseInt( rHTTP_PORT, 10 )
} else {
    HTTP_PORT = rHTTP_PORT
}


export default {
    HTTP_PORT,
    // GAME_PORT: parseInt(process.env.GAME_PORT, 10) || 5050,
    GAME_PORT,
    SERVER_URL: process.env.SERVER_URL || 'ws://localhost',
}