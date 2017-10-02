"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor() {
    }
    static get instance() {
        if (this._instance) {
            this._instance = new BaseController();
        }
        return this._instance;
    }
}
exports.BaseController = BaseController;
