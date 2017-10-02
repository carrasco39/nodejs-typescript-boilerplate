import { TestController } from "../controller/TestController";
import { Router } from "express";

module.exports = (api: any) => {
    const router = Router();
    const instance = TestController.instance;
    router.get("/", instance.route_index);
    console.log("saindo");
    api.use("/tests", router);
};