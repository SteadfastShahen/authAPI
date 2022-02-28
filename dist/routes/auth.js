"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.get('/register', (req, res) => {
    const users = res.send('<h1>Registration screen</h1>');
});
authRouter.get('/login', (req, res) => {
    res.send('<h1>Login screen</h1>');
});
