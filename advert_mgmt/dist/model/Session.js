"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Assuming you have a Sequelize instance named 'sequelize'
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../db/connect"));
class Session extends sequelize_1.Model {
}
Session.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    //foreign key User table
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    sequelize: connect_1.default,
    modelName: 'sessions',
});
// sequelize.sync({force: true})
exports.default = Session;
