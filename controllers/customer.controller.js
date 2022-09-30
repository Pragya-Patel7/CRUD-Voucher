const Customer = require("../models/Customer");
const CustomerProfile = require("../models/CustomerProfile");
const Voucher = require("../models/Voucher");

const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const { generateOTP } = require("../utils/otp.utils");

exports.getAllCustomers = async (req, res) => {
	try {
		//sending details of user after authorisation
		const profile = await CustomerProfile.find().select("-isDeactivated");
		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.getCustomerById = async (req, res) => {
	try {
		const id = req.params.id;

		//sending details of user after authorisation
		const profile = await CustomerProfile.findById(id).select("-isDeactivated");
		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.signUp = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { contactNum } = req.body;

		// check if user already verified
		let userExist = await Customer.findOne({ contactNum });
		if (userExist) {
			return res
				.status(500)
				.send({ msg: "Registered user. Voucher redeemed." });
		}

		//Generate otp only for new user
		const otp = generateOTP(4);
		console.log(otp);

		let customer = new Customer({
			contactNum,
			otp,
			retryAttempts: 0,
			success: false,
		});

		//encrypting otp in database
		const salt = await bcrypt.genSalt(10);
		customer.otp = await bcrypt.hash(customer.otp, salt);

		const result = await customer.save();
		res.status(200).send({ msg: "Otp sent!", data: result });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.register = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	//id of customer schema
	const id = req.params.id;
	let customer = await Customer.findById(id);
	// console.log(customer.contactNum);

	const { name, email } = req.body;
	const profileFields = {
		name,
		// contactNum: req.customer.contactNum, (after authentication using JWT for a private route)
		contactNum: customer.contactNum,
		email,
	};

	console.log(profileFields);

	try {
		//Create profile
		let profile = new CustomerProfile(profileFields);
		const result = await profile.save();
		res
			.status(200)
			.send({ msg: "User registered successfully!", data: result });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.updateProfile = async (req, res) => {
	try {
		//id of customer profile
		const id = req.params.id;

		//update the database
		var updateObject = req.body;
		const profile = await CustomerProfile.findByIdAndUpdate(
			{ _id: id },
			{ $set: updateObject },
			{ new: true } // to send the updated document instead of original one
		);

		const result = await profile.save();

		return res
			.status(200)
			.json({ msg: "Profile updated successfully!", data: result });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.addRedeemedVouchers = async (req, res) => {
	try {
		const voucherRedeemed = req.body.voucherRedeemed;
		const voucher = await Voucher.findOne({ voucherName: voucherRedeemed });

		const id = req.params.id;
		const customer = await CustomerProfile.findById(id);

		if (voucher) {
			customer.voucherRedeemed.push(voucher);

			const result = await customer.save();
			return res
				.status(200)
				.json({ msg: "Vouchers updated successfully!", data: result });
		} else {
			return res.status(404).json({ msg: "Voucher not found!" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error.");
	}
};

exports.removeProfile = async (req, res) => {
	try {
		//id of customer profile
		const id = req.params.id;

		//Remove profile
		const profile = await CustomerProfile.findById(id);

		profile.isDeactivated = true;
		const result = await profile.save();

		res.status(200).json({ msg: "User deleted.", data: result });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error.");
	}
};

// exports.verifyOtp = async (req, res) => {
// 	// Check if max retry attmpts has been done

// 	try {
// 		const { customerOtp, contactNum } = req.body;

// 		let customer = await Customer.findOne({ contactNum })
// 			.sort({ createdAt: -1 })
// 			.limit(1);
// 		// console.log(customer);

// 		const validUser = await bcrypt.compare(customerOtp, customer.otp);

// 		// Check for OTP timeout
// 		const now = new Date();
// 		const timeElapsed = now - customer.createdAt;

// 		if (validUser && timeElapsed < 60 * 1000) {
// 			res.status(200).send({
// 				msg: "Verification successful.",
// 				// data: result,
// 			});

// 			customer.success = true;
// 		} else if (timeElapsed > 60 * 1000) {
// 			res.status(401).send({ msg: "Otp expired." });
// 		} else if (user.retryAttempts < 5) {
// 			customer.retryAttempts = customer.retryAttempts + 1;
// 			customer.success = false;

// 			await customer.save();
// 			res.status(401).send({ msg: "Otp incorrect.", data: customer });
// 		} else if (user.retryAttempts >= 5) {
// 			res
// 				.status(401)
// 				.send({ msg: "Max retry limit reached. Try again later.", data: user });
// 		}
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server error.");
// 	}
// };
