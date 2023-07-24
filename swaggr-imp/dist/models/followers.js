"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Followers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const followersSchema = new mongoose_1.default.Schema({
    follower_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    following_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: { type: Date, default: Date.now },
});
exports.Followers = mongoose_1.default.model('Followers', followersSchema);
