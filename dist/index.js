"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/users-db', () => { console.log('Successfully connected to db'); });
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
// Routes
const auth_1 = require("./routes/auth");
app.use('/auth', auth_1.authRouter);
app.get('/', (req, res) => {
    res.send('<h1>Welcome Screen</h1>');
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
