const { model, Schema } = require("mongoose");

const CustomerProfileSchema = new Schema(
	{
		id: {
			type: String,
		},
		name: {
			type: String,
			trim: true,
		},
		contactNum: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			trim: true,
		},
		voucherRedeemed: [
			{
				voucherName: {
					type: String,
					trim: true,
				},
			},
		],
		isDeactivated: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = CustomerProfile = model(
	"CustomerProfile",
	CustomerProfileSchema
);
