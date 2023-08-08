"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
const sequelize_1 = require("sequelize");
class Token extends sequelize_1.Model {
    delete() {
        throw new Error('Method not implemented.');
    }
}
Token.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: connect_1.default,
    modelName: 'tokens'
});
//   sequelize.sync({ force: true });
exports.default = Token;
