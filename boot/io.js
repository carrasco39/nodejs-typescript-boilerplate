const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

module.exports = async (server) => {
  const io = require("socket.io")(server);

  let events = await fs.readdirAsync(path.get("event"));

  for(let file of events) {
    let handler = require(path.get("event", file));
    if(typeof handler == "function") {
      handler(io);
    }
  }
};