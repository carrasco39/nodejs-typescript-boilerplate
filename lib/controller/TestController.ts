import { Request, Response } from "express";
import { Person } from "../model/Person";
import { BaseController } from "./BaseController";
import * as config from "config";
import * as io from "socket.io-client";


export class TestController extends BaseController {

    constructor() {
        super();
    }

    // private static _instance: TestController;
    public static get instance(): TestController {
        if (this._instance === undefined) {
            this._instance = new TestController();
        }
        return <TestController>this._instance;
    }

    /**
     * route_index
     */
    public route_index(req: Request, res: Response) {
        const carrasco = new Person();

        carrasco.name = "Henrique Carrasco";
        res.send("Hi " + carrasco.name);
    }

    async route_getSocketIOTEXT(req: Request, res: Response) {
        let port = config.get("port");
        console.log(port);
        let socket = io(`http://localhost:${port}/tests`);

        socket.on("connect", () => {
            socket.emit("heartbeat", "are you alive? Yes, you are.");

            res.send("IO test sent. Please, check your console.");
        });
    }
}
