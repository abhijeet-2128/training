"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../db/connect"));
// import { AllowNull } from 'sequelize-typescript';
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    profile_pic: {
        type: sequelize_1.DataTypes.BLOB('long'),
    }
    // lastname: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // status : {
    //   type : DataTypes.BOOLEAN,
    //   allowNull : false
    // },
    // profile_pic : {
    //   type : DataTypes.BLOB,
    //   allowNull : false
    // },
    // mobile :{
    //   type : DataTypes.BIGINT,
    //   allowNull : false
    // },
    // gender : {
    //   type : DataTypes.STRING,
    //   allowNull : false,
    // },
    // dob : {
    //    type : DataTypes.DATE,
    //    allowNull : false
    // },
}, {
    // Other model options go here
    sequelize: connect_1.default,
    modelName: 'users' // We need to choose the model name
});
// sequelize.sync({ alter: true }); // Uncomment this if you want to force sync the model with the database
// Export the User model
exports.default = User;
