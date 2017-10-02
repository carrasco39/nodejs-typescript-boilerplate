import { TestController } from "../controller/TestController";
import { Router } from "express";

module.exports = (api: any) => {
    const router = Router();
    const instance = TestController.instance;
    router.get("/hello", instance.route_index);
    router.get("/", instance.route_getSocketIOTEXT);
    api.use("/tests", router);
};