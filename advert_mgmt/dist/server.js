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
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./db/connect"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// import { signup } from './controllers/user.controllers';
// import userRoutes
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/api', userRoutes_1.default); //--- all routes
app.get('/', (req, res) => {
    res.send('Hello');
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    connect_1.default;
    console.log(`[server]: Server is running at http://localhost:${port}`);
}));
