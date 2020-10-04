import NPC from './NPC'

const goblinData = {
    name: 'a goblin',
    shortDescription: 'a small green creature',
    longDescription: 'A small, dirty looking, green-skinned creature is squatting nearby.',
}

class Goblin extends NPC {
    constructor() {
        super(goblinData)

        

    }
}

export default Goblin
