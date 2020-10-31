import GameServer from "../gameServer"
import { GAME_PORT } from "@common/config"



test( 'class instantiation', () => {
    const gameServer = new GameServer()

    expect( gameServer.game ).not.toEqual( undefined )
    expect( gameServer.port ).not.toEqual( undefined )
    expect( gameServer.port ).toEqual( GAME_PORT )
    expect( gameServer.server ).not.toEqual( undefined )
} )

test( 'uses correct environment varialbes', () => {
    const gameServer = new GameServer()

    expect( gameServer.port ).toEqual( GAME_PORT )
} )

test( 'methods', () => {
    const gameServer = new GameServer()
    
} )