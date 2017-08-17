const path = require("path");

const express = require("express");

const testController = require(path.get("controller", "test"));

module.exports = (api) => {
	const router = express.Router();

	router.get("/", testController.route_getIndex);

	router.get("/io", testController.route_getSocketIOTEXT);

	router.get("/db", testController.route_getDBTEXT);

	api.use("/tests", router);
};