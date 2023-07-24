"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// Replace 'your-secret-key' with a secure secret key for JWT
const JWT_SECRET_KEY = 'asdfgh';
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password, full_name, bio, profile_pic } = req.body;
            // Check if the user already exists
            const existingUser = yield user_1.default.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }
            // Hash the password before saving to the database
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // Create a new user
            const newUser = new user_1.default({
                username,
                email,
                password: hashedPassword,
                full_name,
                bio,
                profile_pic,
            });
            yield newUser.save();
            res.status(201).json({ message: "User created successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            // Find the user in the database by username
            const user = yield user_1.default.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Compare the provided password with the hashed password in the database
            const passwordMatch = yield user.comparePassword(password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Create and sign a JWT token for the user
            jsonwebtoken_1.default.sign({ username: user.username, email: user.email }, JWT_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to create JWT token" });
                }
                // Send the token back to the user
                res.json({ token });
            });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.login = login;
