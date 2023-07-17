"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authRoutes_1 = require("../ApiTask/src/routes/authRoutes");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
