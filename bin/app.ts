import * as Bluebird from "bluebird";
import * as http from "http";
import * as fis from "fs";
import * as path from "path";
import * as config from "config";
import * as express from "express";
import { Web } from "../boot/web";
import * as socketio from "../boot/io";

export async function serve() {
    const fs = Bluebird.promisifyAll(fis);
    const boot = new Web();
    const app = await boot.setApp();
    const server = http.createServer(app);
    const port = config.get("port");
    const io = socketio.startIO(server);
    app.set("port", port);

    server.listen(port, () => {
        console.log("Server running at port " + port);
    });
}