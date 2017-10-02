module.exports = (io: any) => {
    io.of("/tests").on("connection", (socket: any) => {
        socket.on("heartbeat", (msg: any) => {
            console.log(`Heartbeat: ${msg}`);
        });
    });
};