
interface IDefaults {
    GAME_PORT: number
    HTTP_PORT: number
    HTTP_URL: string
}

const DEFAULT: IDefaults = {
    GAME_PORT: 5050,
    HTTP_PORT: 5000,
    HTTP_URL: 'ws://localhost'
}


export const GAME_PORT: number = _gamePort()
export const HTTP_PORT: number = _httpPort()
export const HTTP_URL: string = _serverUrl()


function _serverUrl(): string {
    return process.env.HTTP_URL || DEFAULT.HTTP_URL
}

function _gamePort(): number {
    const gamePort: string | number = process.env.GAME_PORT || DEFAULT.GAME_PORT
    return normalizePort( gamePort )
}

function _httpPort(): number {
    const port: string | number = process.env.HTTP_PORT || DEFAULT.HTTP_PORT
    return normalizePort( port )
}

function normalizePort( port: string | number ): number {
    if ( typeof port === 'string' ) {
        return parseInt( port, 10 )
    } else {
        return port
    }
}
