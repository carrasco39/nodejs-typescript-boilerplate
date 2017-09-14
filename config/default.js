const path = require("path");

module.exports = {
	"path": {
		"base": path.resolve("./"),
		"lib": path.resolve("./lib"),
		"model": path.resolve("./lib/model"),
		"route": path.resolve("./lib/route"),
		"event": path.resolve("./lib/event"),
		"view": path.resolve("./lib/view"),
		"controller": path.resolve("./lib/controller"),
		"storage": path.resolve("./storage"),
		"bin": path.resolve("./bin"),
		"public": path.resolve("./public"),
		"boot": path.resolve("./boot")
	},
	"io": {
	},
	"port": process.env.PORT || 8080,
	"db": {
		"host": process.env.DB_HOST || "localhost",
		"port": process.env.DB_PORT || 27017,
		// "user": process.env.DB_USER || "root",
		// "pass": process.env.DB_PASS || null,
		"name": process.env.DB_NAME || "game"
	}
};
