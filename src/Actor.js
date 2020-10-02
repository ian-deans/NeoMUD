const {v4: uuid} = require('uuid');

class Actor {
    constructor({name}) {
        this.uid = uuid();
        this.name = name;
        this.shortDescription = null;
        this.longDescription = null;
        this.location = null;

        this.hp = {
            current: 10,
            max: 10,
        }

    }

    updateLocation(room) {
        this.location = room;
    }

    getLocation() {
        return this.location;
    }
}


class Player extends Actor {
    constructor({name}) {
        super({name});
    }


    look() {

    }


}