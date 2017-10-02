"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const dotenv = require("dotenv");
const config = require("config");
// type Promise = Promise | Bluebird<any>;
dotenv.config();
function get(key, filepath = "") {
    return path.join(config.get(`path.${key}`), filepath);
}
exports.get = get;
