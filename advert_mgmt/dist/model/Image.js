"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../db/connect"));
class Image extends sequelize_1.Model {
}
Image.init({
    _id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    // Other model options go here
    sequelize: connect_1.default,
    modelName: 'images' // We need to choose the model name
});
// sequelize.sync({ force: true }); // Uncomment this if you want to force sync the model with the database
// Export the Image model
exports.default = Image;
