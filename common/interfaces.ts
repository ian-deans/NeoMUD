export interface IMessage {
    type: string   //TODO: replace with enums ( scope and type )
    scope: string
    clientID?: string
    playerUUID?: string
    content?: any
}

export interface ITick {
    time: Date
    count: number
}

export interface IActorConfig {
    name: string
    shortDescription: string
    longDescription: string
    roomUUID?: string
    zoneUUID?: string
}
