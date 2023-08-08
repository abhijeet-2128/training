"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../db/connect"));
class Address extends sequelize_1.Model {
}
Address.init({
    street: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    zipCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    // Add more fields as needed
}, {
    // Other model options go here
    sequelize: connect_1.default,
    modelName: 'addresses' // We need to choose the model name
});
// sequelize.sync({ force: true }); // Uncomment this if you want to force sync the model with the database
// Export the Address model
exports.default = Address;
