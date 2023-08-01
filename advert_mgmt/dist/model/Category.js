"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary dependencies and set up Sequelize instance
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../db/connect"));
// Define the Category model
class Category extends sequelize_1.Model {
}
Category.init({
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    parent_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: connect_1.default,
    modelName: 'categories',
});
// sequelize.sync({force:true})
exports.default = Category;
