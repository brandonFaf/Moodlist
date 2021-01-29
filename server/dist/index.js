"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_fetch_2 = __importDefault(require("fetch-cookie/node-fetch"));
const auth_1 = __importDefault(require("./auth"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./utils/logger"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
global.fetch = node_fetch_2.default(node_fetch_1.default);
const app = express_1.default();
app.use(cors_1.default());
app.use(cookie_parser_1.default('asdfiojasdnadfgoisdfgh'));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    console.log(req.url);
    res.send('working');
});
app.use('/auth', auth_1.default);
app.listen(process.env.PORT, () => {
    logger_1.default.log(`listening on ${process.env.PORT}`);
});
