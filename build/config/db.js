"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var db = new pg_1.Client({
    host: process.env.DATABASE_HOST,
    // @ts-ignore
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    // password: process.env.DATABASE_PASSWORD,
});
//this is to ensure that numeric values return as numbers and not text
pg_1.types.setTypeParser(1700, "text", parseFloat);
db.connect()
    .then(function () { return console.log("Connected to db"); })
    .catch(function (err) { return console.log("Error", err); });
exports.default = db;
