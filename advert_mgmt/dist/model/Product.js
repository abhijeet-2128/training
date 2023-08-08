"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../db/connect"));
class Product extends sequelize_1.Model {
}
Product.init({
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    desc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    baseprice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    image: {
        type: sequelize_1.DataTypes.BLOB, // Corrected data type to BLOB
        // allowNull: true, 
    },
    bid_value: {
        type: sequelize_1.DataTypes.INTEGER, // Corrected data type to INTEGER
        // allowNull: true, 
    },
    cur_price: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    bidder_id: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull: true, // Assuming title can be optional
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER, // Corrected data type to INTEGER
        // allowNull: true, // Assuming category_id can be optional
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Assuming address_id can be optional
    },
}, {
    // Other model options go here
    sequelize: connect_1.default,
    modelName: 'products', // We need to choose the model name
});
// sequelize.sync({ force: true }); // Uncomment this if you want to force sync the model with the database
// Export the Product model
exports.default = Product;
