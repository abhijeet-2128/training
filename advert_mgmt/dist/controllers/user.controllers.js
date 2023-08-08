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
exports.addAddress = exports.resetPassword = exports.forgetPassword = exports.logout = exports.deleteProfile = exports.updateProfile = exports.getProfile = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../model/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Session_1 = __importDefault(require("../model/Session"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Address_1 = __importDefault(require("../model/Address"));
const Token_1 = __importDefault(require("../model/Token"));
const joi_1 = __importDefault(require("joi"));
const dotenv_1 = __importDefault(require("dotenv"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
const redis_1 = require("redis");
dotenv_1.default.config();
//--------------------Signup------------------------------
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, firstname } = req.body;
        // Check if the user already exists
        const existingUser = yield User_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the new user
        const newUser = yield User_1.default.create({
            username,
            email,
            password: hashedPassword,
            firstname,
        });
        return res.status(201).json({ message: 'Signup successful', user: newUser });
    }
    catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Signup failed' });
    }
});
exports.signup = signup;
//__________________________________________Login______________________________
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //redis connection
        const client = (0, redis_1.createClient)();
        client.on("error", (err) => console.log("redis client error <-------------", err));
        client.connect().then(() => {
            console.log("connected");
        }).then((error) => {
            console.log("error");
        });
        const { username, password } = req.body;
        // Check if the user exists in the database
        const user = yield User_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if the password matches
        // if (user.password !== password) {
        //   return res.status(401).json({ message: 'Invalid credentials' });
        // }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // User is authenticated, create a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'asdfg', { expiresIn: '1h' });
        //session 
        const isSession = yield Session_1.default.findOne({ where: { userId: user.id } });
        if (!isSession) {
            const session = yield Session_1.default.create({
                userId: user.id,
                isActive: true
            });
        }
        //rdis session
        const redisSession = yield client.get(`x`);
        console.log(redisSession);
        if (!redisSession) {
            let session_payload = {
                userId: user.id,
                isActive: true
            };
            yield client.set(`${user.id}_session`, JSON.stringify(session_payload));
        }
        return res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Login failed' });
    }
});
exports.login = login;
//_______________________________get Profile__________________________
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the user details using the userId attached by the middleware
        console.log(req.body.userId);
        const user = yield User_1.default.findOne({ where: { id: req.body.userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user profile
        return res.status(200).json({ message: 'Profile retrieved successfully', user });
    }
    catch (error) {
        console.error('Error while fetching profile:', error);
        return res.status(500).json({ message: 'Failed to fetch profile' });
    }
});
exports.getProfile = getProfile;
//----------------------------update profile-------------------------
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { new_username, newPassword } = req.body;
            const userId = req.body.userId;
            // Find the user in the database
            const user = yield User_1.default.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Update the user's username and password if provided
            if (new_username) {
                user.username = new_username;
            }
            if (newPassword) {
                // Hash the new password
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                user.password = hashedPassword;
            }
            yield user.save();
            // Respond with a success message
            return res.json({ message: 'Profile updated successfully' });
        }
        catch (error) {
            // Handle any errors that might occur during profile update
            console.error('Error during profile update:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.updateProfile = updateProfile;
//-------------------delete profile
function deleteProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.body.userId;
            // Find the user in the database
            const user = yield User_1.default.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Perform any additional cleanup or operations before deleting the user (if required)
            // Delete the user from the database
            yield user.destroy();
            // Respond with a success message
            return res.json({ message: 'Profile deleted successfully' });
        }
        catch (error) {
            // Handle any errors that might occur during profile deletion
            console.error('Error during profile deletion:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.deleteProfile = deleteProfile;
//----------Logout --------------------------------------------
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the userId from the request object (assuming you are using middleware to attach the userId to the request)
        const { userId } = req.body;
        // find user session 
        const session = yield Session_1.default.findOne({ where: { userId } });
        // If the session does not exist or is already inactive
        if (!session || !session.isActive) {
            return res.status(404).json({ message: 'Session not found or already logged out' });
        }
        // Update the isActive field to false to indicate logout
        session.isActive = false;
        yield session.save();
        return res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Logout failed' });
    }
});
exports.logout = logout;
//--------Forget Password ---------
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {userId } = req.body;
    // const user = await User.findByPk(userId);
    try {
        const schema = joi_1.default.object({ email: joi_1.default.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const user = yield User_1.default.findOne({ where: { email: req.body.email } });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");
        let token = yield Token_1.default.findOne({ where: { id: user.id } });
        if (!token) {
            token = yield Token_1.default.create({
                id: user.id,
                token: crypto_1.default.randomBytes(32).toString("hex"),
            });
        }
        const link = `${process.env.BASE_URL}/reset-pass/${user.id}/${token.token}`;
        yield (0, sendEmail_1.default)(user.email, "Password reset", link);
        res.send("password reset link sent to your email account");
    }
    catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});
exports.forgetPassword = forgetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({ password: joi_1.default.string().required() });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const user = yield User_1.default.findByPk(req.params.user_id);
        if (!user)
            return res.status(400).send("invalid link or expired");
        const token = yield Token_1.default.findOne({ where: {
                id: user.id,
                token: req.params.token,
            } });
        if (!token)
            return res.status(400).send("Invalid link or expired");
        user.password = req.body.password;
        // await token.delete();
        yield user.save();
        // token.delete();
        res.send("password reset sucessfully.");
    }
    catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});
exports.resetPassword = resetPassword;
//---add Addresss-------------------
function addAddress(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            const { street, city, state, zipCode } = req.body;
            // Check if the user exists
            const user = yield User_1.default.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Create a new address and associate it with the user
            const newAddress = yield Address_1.default.create({
                street,
                city,
                state,
                zipCode,
                userId, // Associate the address with the user
            });
            res.status(201).json(newAddress);
        }
        catch (error) {
            console.error('Failed to add address:', error);
            res.status(500).json({ error: 'Failed to add address' });
        }
    });
}
exports.addAddress = addAddress;
// router.post("/", async (req, res) => {
// });
