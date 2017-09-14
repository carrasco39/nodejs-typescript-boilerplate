const Promise = require("bluebird");

const path = require("path");
const config = require("config");

const Controller = require(path.get("controller", "base"));
const io = require('socket.io-client');
const mongoose = require("mongoose");

class TestController extends Controller {
	constructor() {
		super();
	}

	async route_getIndex(req, res) {
		res.send(path.basename(__filename, path.extname(__filename)));
		let glob = Promise.promisify(require("glob"));
		let modelFiles = await glob(path.get("model", "**/*.js"));
		
		return res.send(modelFiles);
	}

	async route_getSocketIOTEXT(req, res) {
		let port = config.get("port");
		let socket = io(`http://localhost:${port}/tests`);

		socket.on("connect", () => {
			socket.emit("heartbeat", "are you alive? Yes, you are.");

			res.send("IO test sent. Please, check your console.");
		});
	}

	async route_getDBTEXT(req, res) {
		let status;
		switch(mongoose.connection.readyState) {
			case 0: status = "disconnected"; break;
			case 1: status = "connected"; break;
			case 2: status = "connecting"; break;
			case 3: status = "disconnecting"; break;
		}

		return res.send(`Connection status: ${status}`);
	}
}

let instance = new TestController();

module.exports = instance;
