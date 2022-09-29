const express = require("express");
const router = express.Router();
const Voucher = require("../models/Voucher");

//@route        POST api/
//@description  Create token
router.post("/", async (req, res) => {
	try {
		const { couponCode, description, brandName, type, amount, isActive } =
			req.body;

		const newVoucher = new Voucher({
			couponCode,
			description,
			brandName,
			type,
			amount,
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
});

//@route        GET api/
//@description  Get all vouchers
router.get("/", async (req, res) => {
	try {
		const vouchers = await Voucher.find();
		res.json(vouchers);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error.");
	}
});

//@route        GET api/
//@description  Get voucher using id
router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const voucher = await Voucher.findById(id);

		if (voucher) {
			res.json({
				couponCode: voucher.couponCode,
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
});

//@route        PATCH api/
//@description  Edit voucher
router.patch("/:id", async (req, res) => {
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
});

//@route        PATCH api/
//@description  Delete voucher

//only deactivating the voucher and not removing it from the database.
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
