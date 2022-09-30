const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
	{
		contactNum: {
			type: String,
			required: true,
			trim: true,
		},
		otp: {
			type: String,
		},
		retryAttempts: {
			type: Number,
			//required: true,
		},
		success: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = Customer = mongoose.model("customer", CustomerSchema);
