"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const gqlEndpoint = process.env.ENDPOINT || '';
const secret = process.env.SECRET || '';
console.log('vars:', gqlEndpoint, secret);
exports.default = async ({ query, operationName }, variables = null, endpoint = gqlEndpoint, adminSecret = secret) => {
    const body = JSON.stringify({
        query,
        variables,
        operationName
    });
    const res = await node_fetch_1.default(endpoint, {
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': adminSecret
        },
        method: 'POST',
        body
    });
    return await res.json();
};
