export interface IMessage {
    type: string;   //TODO: replace with enums ( scope and type )
    scope: string;
    clientID: string;
    playerUUID?: string;
    content?: any;
}
