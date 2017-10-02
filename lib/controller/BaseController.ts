
export class BaseController {

    constructor() {

    }
    protected static _instance: BaseController;
    public static get instance(): BaseController {
        if (this._instance) {
            this._instance = new BaseController();
        }
        return this._instance;
    }
}

