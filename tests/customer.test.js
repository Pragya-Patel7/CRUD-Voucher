const request = require("supertest");
const app = require("../server");

//  getAllCustomers,
// 	getCustomerById,
// 	signUp,
// 	verifyOtp,
// 	register,
// 	updateProfile,
// 	removeProfile,
// 	addRedeemedVouchers,

describe("Cutomer API", () => {
	it("GET /user ---> array users", async () => {
		// return request(app)
		// 	.get("/user")
		// 	.expect("Content-Type", /json/)
		// 	.expect(200)
		// 	.then((res) => {
		// 		// console.log(res);
		// 		expect(res.body).toEqual(
		// 			expect.arrayContaining([
		// 				expect.objectContaining({
		// 					name: expect.any(String),
		// 					contactNum: expect.any(String),
		// 					email: expect.any(String),
		// 					voucherRedeemed: expect.arrayContaining([
		// 						expect.objectContaining({
		// 							voucherName: expect.any(String),
		// 						}),
		// 					]),
		// 				}),
		// 			])
		// 		);
		// 	});
	});

	it("GET /vouchers/:id ---> voucher", async () => {
		// return request(app)
		// 	.get("/vouchers/6333235b64e1f1dcbf5a732f")
		// 	.expect("Content-Type", /json/)
		// 	.expect(200)
		// 	.then((res) => {
		// 		// console.log(res);
		// 		expect(res.body).toEqual(
		// 			expect.objectContaining({
		// 				voucherName: expect.any(String),
		// 				isActive: expect.any(Boolean),
		// 			})
		// 		);
		// 	});
	});

	// it("GET /:id ---> 404 if not found", async () => {
	// 	return request(app).get("/9999999").expect(404);
	// });

	it("POST /vouchers ---> created voucher", async () => {
		// const res = await request(app).post("/vouchers").send({
		// 	voucherName: "xyz",
		// 	isActive: true,
		// });
		// expect(res.statusCode).toBe(200);
	});

	it("PATCH /vouchers/:id ---> updated voucher", async () => {
		// const res = await request(app)
		// 	.patch("/vouchers/6333235b64e1f1dcbf5a732f")
		// 	.send({
		// 		voucherName: "xyzw",
		// 	});
		// expect(res.statusCode).toBe(200);
	});

	it("POST /vouchers/:id ---> deleted voucher", async () => {
		// const res = await request(app)
		// 	.delete("/vouchers/6333235b64e1f1dcbf5a732f")
		// 	.send({});
		// expect(res.statusCode).toBe(200);
	});
});
