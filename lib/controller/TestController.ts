import { Request, Response } from "express";
import { Person } from "../model/Person";
import { BaseController } from "./BaseController";


export class TestController extends BaseController {

    constructor() {
        super();
    }

    private static _instance: TestController;
    public static get instance(): TestController {
        if (this._instance === undefined) {
            this._instance = new TestController();
        }
        return this._instance;
    }

    /**
     * route_index
     */
    public route_index (req: Request, res: Response) {
        const carrasco = new Person();

        carrasco.name = "Henrique Carrasco";
        res.send("Hi " + carrasco.name);
    }
}
