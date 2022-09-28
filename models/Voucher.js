const mongoose = require("mongoose");

const VoucherSchema = mongoose.Schema(
	{
		couponCode: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		brandName: {
			type: String,
		},
		type: {
			type: String,
		},
		amount: {
			type: String,
		},
		isActive: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Voucher = mongoose.model("voucher", VoucherSchema);
