const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");
const mongoose = require("mongoose");

module.exports = async () => {

	if(! fs.existsSync(".env")) {
		await (() => {
			return new Promise((resolve, reject) => {
				let iStream = fs.createReadStream(".env.example");
				let oStream = fs.createWriteStream(".env");

				let onError = (err) => {
					iStream.destroy();
					oStream.end();

					reject(err);
				};

				iStream.on("error", onError);
				oStream.on("error", onError);
				
				oStream.on("finish", resolve);

				iStream.pipe(oStream);
			});
		})();
	}

	require("dotenv").config();
	const config = require("config");

	path.get = (key, filepath = "") => {
		return path.join(config.get(`path.${key}`), filepath);
	};

	let dbConfig = config.get("db");
	mongoose.Promise = Promise;

	mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);
};
