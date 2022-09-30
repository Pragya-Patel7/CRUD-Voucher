const express = require("express");
const connectDB = require("./config/db");
const voucher = require("./routes/voucher.route");
const customer = require("./routes/customer.route");

const app = express();

//Init middleware
app.use(express.json({ extended: false }));

//connect database
connectDB();

app.use("/vouchers", voucher);
app.use("/user", customer);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
