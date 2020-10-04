const Item = require('./Item')
class Weapon extends Item {
    constructor({wieldType, damageType, attackPower, attackSpeed, ...data}) {
        super(data)
        
        if (!Weapon.wieldTypes.indexOf(wieldType)) {
            throw new Error('')
        }
        
        this.attackPower = attackPower
        this.attackSpeed = attackSpeed

        this.wieldType = wieldType

    }

    static wieldTypes = ['oneHanded', 'twoHanded']
    static damageTypes = ['slashing', 'piercing', 'bludgeon']
}