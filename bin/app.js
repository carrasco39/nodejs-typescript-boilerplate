(async () => {
	const Promise = require("bluebird");
	const fs = Promise.promisifyAll(require("fs"));
	const path = require("path");
	const config = require("config");
	const express = require("express");

	const app = await require(path.get("boot", "web"))();
	const server = require("http").Server(app);
	const io = await require(path.get("boot", "io"))(server);

	let port = config.get("port");
	app.set("port", port);

	server.listen(port, () => {
		console.log("Server running at port " + port);
	});
})();
