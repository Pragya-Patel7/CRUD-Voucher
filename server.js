const express = require("express");
const connectDB = require("./config/db");
const voucher = require("./routes/voucher.route");

const app = express();

//Init middleware
app.use(express.json({ extended: false }));

//connect database
connectDB();

app.use("/", voucher);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
