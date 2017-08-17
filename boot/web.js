const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");
const config = require("config");

const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const express = require("express");

module.exports = async () => {
	const app = express();

	// view engine setup
	app.set("views", path.get("view"));
	app.set("view engine", "pug");

	app.use(favicon(path.get("public", "favicon.ico")));
	app.use(logger("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({"extended": false}));
	app.use(cookieParser());

	let routers = await fs.readdirAsync(path.get("route"));
	for(let file of routers) {
		let handler = require(path.get("route", file));
		if(typeof handler == "function") {
			handler(app);
		}
	}

	// catch 404 and forward to error handler
	app.use(async (req, res, next) => {
	  var err = new Error("Not Found");
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(async (err, req, res, next) => {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get("env") === "development" ? err : {};

	  // render the error page
	  let code = err.status || 500;
		let view = `errors/${code}`;

		if(!fs.existsSync(path.get("view", `${view}.pug`))) {
			view = "errors/default";
		}

		console.log(view);

	  res.status(code);
	  res.render(view);
	});

	return app;
};