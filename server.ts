import * as starter from "./boot/start";
import * as async from "async";
import * as app from "./bin/app";

(async () => {
    await starter.start();
    app.serve();
})();