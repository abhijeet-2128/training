"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var router = express_1.default.Router();
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
exports.default = router;
