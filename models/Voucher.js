const mongoose = require("mongoose");

const VoucherSchema = mongoose.Schema(
	{
		voucherName: {
			type: String,
			required: true,
		},
		termsConditions: {
			type: String,
		},
		redemptionProcess: {
			type: String,
		},
		offer: {
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
