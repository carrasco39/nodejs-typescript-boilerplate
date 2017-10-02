"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const fis = require("fs");
const socketio = require("socket.io");
const helper = require("../utils/helper");
const fs = Bluebird.promisifyAll(fis);
function startIO(server) {
    return __awaiter(this, void 0, void 0, function* () {
        let io = socketio(server);
        let events = yield fs.readdirAsync(helper.get("event"));
        for (let file of events) {
            let handler = require(helper.get("event", file));
            if (typeof handler == "function") {
                handler(io);
            }
        }
        return io;
    });
}
exports.startIO = startIO;
