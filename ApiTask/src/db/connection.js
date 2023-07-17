"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('test_postres', 'postgres', '      ', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.default = sequelize;
