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
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const helper = require("../utils/helper");
const fs = Bluebird.promisifyAll(fis);
class Web {
    constructor() {
    }
    setApp() {
        return __awaiter(this, void 0, void 0, function* () {
            const app = express();
            // view engine setup
            app.set("views", helper.get("view"));
            app.set("view engine", "pug");
            app.use(favicon(helper.get("public", "favicon.ico")));
            app.use(logger("dev"));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ "extended": false }));
            app.use(cookieParser());
            const routers = yield fs.readdirAsync(helper.get("route"));
            for (const file of routers) {
                const handler = require(helper.get("route", file));
                console.log(helper.get("route", file));
                if (typeof handler == "function") {
                    handler(app);
                }
                console.log(helper.get("route", file));
            }
            // catch 404 and forward to error handler
            app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                const err = new Error("404 Not Found");
                err.status = 404;
                next(err);
            }));
            // error handler
            app.use((err, req, res, next) => __awaiter(this, void 0, void 0, function* () {
                // set locals, only providing error in development
                res.locals.message = err.message;
                res.locals.error = req.app.get("env") === "development" ? err : {};
                // render the error page
                const code = err.status || 500;
                res.status(code);
                if (req.xhr) {
                    return res.json({
                        "message": res.locals.message,
                        "error": res.locals.error
                    });
                }
                let view = `errors/${code}`;
                if (!fs.existsSync(helper.get("view", `${view}.pug`))) {
                    view = "errors/default";
                }
                res.render(view);
            }));
            return app;
        });
    }
}
exports.Web = Web;
