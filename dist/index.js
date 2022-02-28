"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect('mongodb://localhost:27017/users-db', function () { console.log('Successfully connected to db'); });
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
// Routes
var auth_1 = require("./routes/auth");
app.use('/auth', auth_1.authRouter);
app.get('/', function (req, res) {
    res.send('<h1>Welcome Screen</h1>');
});
app.listen(PORT, function () { return console.log("server running on port ".concat(PORT)); });
