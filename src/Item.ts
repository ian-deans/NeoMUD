import { v4 as uuid } from 'uuid';

/**
 * Item is the base for any object such as potions, weapons, 
 * furniture, etc. All objects have names and descriptions
 * as well as uids
 */


export default class Item {
    uid: string;
    item_id: string;    // The uuid of the base model entry
    name: string;
    shortDescription: string;   // The description displayed in rooms ("A rusted sword lies here.")
    longDescription: string;    // Description for when item is inspected.

    constructor({ name, shortDescription, longDescription }) {
        this.uid =  uuid()
        this.name = name
        this.shortDescription = shortDescription
        this.longDescription = longDescription
    }
}
