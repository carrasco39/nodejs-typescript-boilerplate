import * as Bluebird from "bluebird";
import * as fis from "fs";
import * as async from "async";
import * as socketio from "socket.io";
import * as helper from "../utils/helper";

const fs: any = Bluebird.promisifyAll(fis);


module.exports = async (server: any) => {
    let io = socketio(server);
    let events = await fs.readdirAsync(helper.get("event"));

    for (let file of events) {
        let handler = require(helper.get("event", file));
        if (typeof handler == "function") {
            handler(io);
        }
    }
    return io;
};

