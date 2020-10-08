import { Directions } from '../constants/directions';

export function directionOppositeOf( direction ) {
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