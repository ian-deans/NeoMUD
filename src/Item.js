/**
 * Item is the base for any object such as potions, weapons, furniture, etc. All objects have names and descriptions
 * as well as uids
 */

const { v4: uuid } = require('uuid')

class Item {
    constructor({ uid, name, shortDescription, longDescription }) {
        this.uid = uid ? uid : uuid()
        this.name = name
        this.shortDescription = shortDescription
        this.longDescription = longDescription
    }
}

module.exports = Item