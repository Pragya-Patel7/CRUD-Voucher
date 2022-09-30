exports.generateOTP = (otpLength) => {
	//Declare a digit variable to store all digits
	const digits = "0123456789";
	let otp = "";

	for (i = 0; i < otpLength; i++) {
		otp += digits[Math.floor(Math.random() * 10)];
	}

	return otp;
};
