"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NPC_1 = __importDefault(require("./NPC"));
const goblinData = {
    name: 'a goblin',
    shortDescription: 'a small green creature',
    longDescription: 'A small, dirty looking, green-skinned creature is squatting nearby.',
};
class Goblin extends NPC_1.default {
    constructor() {
        super(goblinData);
    }
}
exports.default = Goblin;
//# sourceMappingURL=Goblin.js.map