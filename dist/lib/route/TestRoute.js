"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestController_1 = require("../controller/TestController");
const express_1 = require("express");
module.exports = (api) => {
    const router = express_1.Router();
    const instance = TestController_1.TestController.instance;
    router.get("/", instance.route_index);
    console.log("saindo");
    api.use("/tests", router);
};
