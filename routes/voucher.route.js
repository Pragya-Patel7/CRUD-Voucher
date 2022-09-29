const express = require("express");
const router = express.Router();
const {
	createVoucher,
	getAllVouchers,
	getVoucherById,
	editVoucher,
	deactivateVoucher,
} = require("../controllers/voucher.controller");

//@route        POST api/
//@description  Create token
router.post("/", createVoucher);

//@route        GET api/
//@description  Get all vouchers
router.get("/", getAllVouchers);

//@route        GET api/
//@description  Get voucher using id
router.get("/:id", getVoucherById);

//@route        PATCH api/
//@description  Edit voucher
router.patch("/:id", editVoucher);

//@route        PATCH api/
//@description  Delete voucher

//only deactivating the voucher and not removing it from the database.
router.delete("/:id", deactivateVoucher);

module.exports = router;
