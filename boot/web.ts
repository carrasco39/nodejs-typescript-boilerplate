import * as Bluebird from "bluebird";
import * as fis from "fs";
import * as path from "path";
import * as config from "config";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as helper from "../utils/helper";

const fs: any = Bluebird.promisifyAll(fis);

export class Web {
    constructor() {
    }

    async setApp() {
        const app = express();

        // view engine setup
        app.set("views", helper.get("view"));
        app.set("view engine", "pug");

        app.use(favicon(helper.get("public", "favicon.ico")));
        app.use(logger("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ "extended": false }));
        app.use(cookieParser());

        const routers = await fs.readdirAsync(helper.get("route"));
        for (const file of routers) {
            const handler = require(helper.get("route", file));
            console.log(helper.get("route", file));
            if (typeof handler == "function") {
                handler(app);
            }
            console.log(helper.get("route", file));
        }


        // catch 404 and forward to error handler
        app.use(async (req, res, next) => {
            const err: any = new Error("404 Not Found");
            err.status = 404;

            next(err);
        });

        // error handler
        app.use(async (err: any, req: any, res: any, next: any) => {
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
        });

        return app;
    }
}