const Voucher = require("../models/Voucher");

exports.createVoucher = async (req, res) => {
	try {
		const { voucherName, termsConditions, redemptionProcess, offer, isActive } =
			req.body;

		const newVoucher = new Voucher({
			voucherName,
			termsConditions,
			redemptionProcess,
			offer,
			isActive,
		});

		const result = await newVoucher.save();

		return res
			.status(200)
			.json({ msg: "Voucher created successfully!", data: result });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.getAllVouchers = async (req, res) => {
	try {
		const vouchers = await Voucher.find();
		res.json(vouchers);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error.");
	}
};

exports.getVoucherById = async (req, res) => {
	try {
		const id = req.params.id;
		const voucher = await Voucher.findById(id);

		if (voucher) {
			res.json({
				voucherName: voucher.voucherName,
				isActive: voucher.isActive,
			});
		} else {
			return res.status(404).json({ msg: "Voucher not found." });
		}

		// res.json(voucher);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.editVoucher = async (req, res) => {
	try {
		var id = req.params.id;
		var updateObject = req.body;
		const voucher = await Voucher.findOneAndUpdate(
			{ _id: id },
			{ $set: updateObject },
			{ new: true } // to send the updated document instead of original one
		);

		const result = await voucher.save();

		return res
			.status(200)
			.json({ msg: "Voucher updated successfully!", data: result });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.deactivateVoucher = async (req, res) => {
	try {
		let id = req.params.id;

		//Remove profile
		const voucher = await Voucher.findOne({ _id: id });

		voucher.isActive = false;
		const result = await voucher.save();

		res.status(200).json({ msg: "Voucher deactivated.", data: result });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};
