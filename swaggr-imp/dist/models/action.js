"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const actionSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    action_type: {
        type: String,
        enum: ['like', 'comment', 'follow'],
        required: true,
    },
    post_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Post',
        required: function () {
            return ['like', 'comment'].includes(this.action_type);
        },
    },
    comment: {
        user_id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
        text: String,
        created_at: { type: Date, default: Date.now },
        replies: [
            {
                user_id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: String,
                created_at: { type: Date, default: Date.now },
            },
        ],
    },
    created_at: { type: Date, default: Date.now },
});
exports.Action = mongoose_1.default.model('Action', actionSchema);
