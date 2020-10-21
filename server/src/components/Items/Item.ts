import { v4 as uuidv4 } from 'uuid';

/**
 * Item is the base for any object such as potions, weapons, 
 * furniture, etc. All objects have names and descriptions
 * as well as uids
 */


export default class Item {
    uuid: string;
    itemId: string;    // The uuid of the base model entry
    name: string;
    shortDescription: string;   // The description displayed in rooms ("A rusted sword lies here.")
    longDescription: string;    // Description for when item is inspected.

    constructor({ name, shortDescription, longDescription }) {
        this.uuid =  uuidv4()
        this.name = name
        this.shortDescription = shortDescription
        this.longDescription = longDescription
    }
}

/**
 * 
 */