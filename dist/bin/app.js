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
const http = require("http");
const fis = require("fs");
const config = require("config");
const web_1 = require("../boot/web");
function serve() {
    return __awaiter(this, void 0, void 0, function* () {
        const fs = Bluebird.promisifyAll(fis);
        const boot = new web_1.Web();
        const app = yield boot.setApp();
        const server = http.createServer(app);
        const port = config.get("port");
        app.set("port", port);
        server.listen(port, () => {
            console.log("Server running at port " + port);
        });
    });
}
exports.serve = serve;
