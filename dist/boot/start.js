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
const fs = require("fs");
const dotenv = require("dotenv");
const fis = Bluebird.promisifyAll(fs);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!fis.existsSync(".env")) {
            yield (() => {
                return new Bluebird((resolve, reject) => {
                    const iStream = fis.createReadStream(".env.example");
                    const oStream = fis.createWriteStream(".env");
                    const onError = (err) => {
                        iStream.destroy();
                        oStream.end();
                        reject(err);
                    };
                    iStream.on("error", onError);
                    oStream.on("error", onError);
                    oStream.on("finish", resolve);
                    iStream.pipe(oStream);
                });
            });
        }
        // mongoose.Promise = Bluebird;
        dotenv.config();
        // const dbConfig = config.get("db");
        // console.log(dbConfig);
        // mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);
    });
}
exports.start = start;
