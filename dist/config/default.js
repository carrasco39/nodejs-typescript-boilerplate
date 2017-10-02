const path = require("path");
module.exports = {
    "path": {
        "base": path.resolve("./"),
        "lib": path.resolve("./dist/lib"),
        "model": path.resolve("./dist/lib/model"),
        "route": path.resolve("./dist/lib/route"),
        "event": path.resolve("./dist/lib/event"),
        "view": path.resolve("./view"),
        "controller": path.resolve("./dist/lib/controller"),
        "storage": path.resolve("./storage"),
        "bin": path.resolve("./dist/bin"),
        "public": path.resolve("./public"),
        "boot": path.resolve("./dist/boot")
    },
    "io": {},
    "port": process.env.PORT || 8080,
    "db": {
        "host": process.env.DB_HOST || "localhost",
        "port": process.env.DB_PORT || 27017,
        // "user": process.env.DB_USER || "root",
        // "pass": process.env.DB_PASS || null,
        "name": process.env.DB_NAME || "game"
    }
};
