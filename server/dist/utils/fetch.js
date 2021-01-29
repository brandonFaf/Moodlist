"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const node_fetch_2 = __importDefault(require("fetch-cookie/node-fetch"));
exports.default = node_fetch_2.default(node_fetch_1.default);
