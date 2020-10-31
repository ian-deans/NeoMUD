import Actor from '@components/Actors/Actor'
import { IActorConfig } from "@common/interfaces"


test( 'instantiation', () => {
    const config: IActorConfig = {
        name: 'Test Actor',
        shortDescription: 'A tall test of an actor stands here.',
        longDescription: 'Test Actor is the standard at which all game actors aspire to uphold',
    }

    const testActor = new Actor( config )

    expect( testActor.name ).toEqual( config.name )
    // expect( testActor.shortDescription ).toEqual( config.shortDescription )
    // expect( testActor.longDescription ).toEqual( config.longDescription )
} )