"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("../model/Person");
const BaseController_1 = require("./BaseController");
class TestController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    static get instance() {
        if (this._instance === undefined) {
            this._instance = new TestController();
        }
        return this._instance;
    }
    /**
     * route_index
     */
    route_index(req, res) {
        const carrasco = new Person_1.Person();
        carrasco.name = "Henrique Carrasco";
        res.send("Hi " + carrasco.name);
    }
}
exports.TestController = TestController;
