module.exports = (io) => {
    io.of("/tests").on("connection", (socket) => {
        socket.on("heartbeat", (msg) => {
            console.log(`Heartbeat: ${msg}`);
        });
    });
};
