const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
	try {
		await mongoose.connect(db);

		console.log("Mongoose connected...");
	} catch (err) {
		console.error(err.message);
	}
};

module.exports = connectDB;
