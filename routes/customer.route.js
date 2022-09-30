const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const {
	getAllCustomers,
	getCustomerById,
	signUp,
	verifyOtp,
	register,
	updateProfile,
	removeProfile,
	addRedeemedVouchers,
} = require("../controllers/customer.controller");

//@route        GET /user
//@description  Get profile of all the customers
router.get("/", getAllCustomers);

//@route        GET /user/:id
//@description  Get customer profile by id
router.get("/:id", getCustomerById);

//@route        POST /user/signUp
//@description  Send otp to user for registration
router.post(
	"/signUp",
	[
		check("contactNum", "Invalid mobile number.").isInt(),
		check("contactNum", "Contact number should be of 10 digits.").isLength(10),
	],
	signUp
);

//@route        POST /user/verifyOtp
//@description  Verify the user otp
// router.post("/verifyOtp", verifyOtp);

// @route        POST /user/:id
// @description  Create user profile by id
// @access       Private route after JWT authentication
router.post(
	"/:id",
	[
		check("name", "Name is required.").notEmpty(),
		check("email", "Email id is required.").notEmpty(),
	],
	register
);

// @route        PUT /user/vouchersRedeemed/:id
// @description  Adding vouchers redeemed by customer in customer profile
router.put("/vouchersRedeemed/:id", addRedeemedVouchers);

// @route        PATCH /user/profile/:id
// @description  Update user's profile
// @access       Private route after JWT authentication
router.patch("/update/:id", updateProfile);

// @route        DELETE /user/delete/:id
// @description  Delete user's profile
// @access       Private route after JWT authentication
router.delete("/delete/:id", removeProfile);

module.exports = router;
