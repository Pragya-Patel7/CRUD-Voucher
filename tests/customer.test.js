const request = require("supertest");
const app = require("../server");

const customerProfileId = "66336bad79d3ab1585a92576a";
const customerId = "6336ba8b9d3ab1585a925767";
const testCustomer = {
	name: "testCustomer",
	email: "testCustomer@xyz.in",
};

describe("Cutomer API", () => {
	it("GET /user ---> get all users", async () => {
		return request(app)
			.get("/user")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				// console.log(res);
				expect(res.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							name: expect.any(String),
							contactNum: expect.any(String),
							email: expect.any(String),
							voucherRedeemed: expect.arrayContaining([
								expect.objectContaining({
									voucherName: expect.any(String),
								}),
							]),
						}),
					])
				);
			});
	});

	it("GET /user/:id ---> get user profile by ID", async () => {
		return request(app)
			.get(`/user/${customerProfileId}`)
			.expect("Content-Type", "application/json; charset=utf-8")
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual(
					expect.objectContaining({
						name: expect.any(String),
						contactNum: expect.any(String),
						email: expect.any(String),
						voucherRedeemed: expect.arrayContaining([
							expect.objectContaining({
								voucherName: expect.any(String),
							}),
						]),
					})
				);
			});
	});

	// it("POST /user/signUp ---> signing up user", async () => {
	// 	const res = await request(app).post(`/user/signUp`).send({
	// 		contactNum: "1234657880",
	// 	});
	// 	// console.log(res);
	// 	expect(res.statusCode).toBe(200);
	// });

	it("POST /user/:id ---> registering user", async () => {
		const res = await request(app)
			.post(`/user/${customerId}`)
			.send(testCustomer);
		// console.log(res);
		expect(res.statusCode).toBe(200);
	});

	it("PUT /user/vouchersRedeemed/:id ---> adding redeemed voucher", async () => {
		const res = await request(app)
			.put(`/user/vouchersRedeemed/${customerProfileId}`)
			.send({
				voucherRedeemed: "AJIO",
			});
		// console.log(res);
		expect(res.statusCode).toBe(200);
	});

	it("PATCH /user/update/:id ---> update profile", async () => {
		const res = await request(app)
			.patch(`/user/update/${customerProfileId}`)
			.send({
				name: "customer1",
			});
		// console.log(res);
		expect(res.statusCode).toBe(200);
	});

	it("DELETE /user/delete/:id ---> deactivate profile", async () => {
		const res = await request(app)
			.delete(`/user/delete/${customerProfileId}`)
			.send({});
		expect(res.statusCode).toBe(200);
	});
});
