import { Directions } from '../constants/directions';
import { IMessage } from '../src/interfaces';

export function directionOppositeOf( direction: Directions ): string {
    switch ( direction ) {
        case Directions.NORTH: {
            return Directions.SOUTH
        }
        case Directions.EAST: {
            return Directions.WEST
        }
        case Directions.SOUTH: {
            return Directions.NORTH
        }
        case Directions.WEST: {
            return Directions.EAST
        }
    }
}


export function createMessage( { scope, clientID, playerUUID, type, content }: IMessage ): string {
    const message: IMessage = {
        scope,
        type,
        clientID,
    };

    if ( playerUUID ) {
        message.playerUUID = playerUUID;
    }

    if ( content ) {
        message.content = content;
    }
    
    return JSON.stringify( message );
}