"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("../model/Person");
const BaseController_1 = require("./BaseController");
const config = require("config");
const io = require("socket.io-client");
class TestController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    // private static _instance: TestController;
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
    route_getSocketIOTEXT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let port = config.get("port");
            console.log(port);
            let socket = io(`http://localhost:${port}/tests`);
            socket.on("connect", () => {
                socket.emit("heartbeat", "are you alive? Yes, you are.");
                res.send("IO test sent. Please, check your console.");
            });
        });
    }
}
exports.TestController = TestController;
