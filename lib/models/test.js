const mongoose = require("mongoose");

const schema = mongoose.Schema({
	"data": {
		"type": String,
		"required": true
	}
});

const model = mongoose.model("test", schema);

module.exports = model;