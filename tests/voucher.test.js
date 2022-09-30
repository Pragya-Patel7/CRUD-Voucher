const request = require("supertest");
const app = require("../server");

describe("Voucher API", () => {
	it("GET /vouchers ---> array vouchers", async () => {
		return request(app)
			.get("/vouchers")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				// console.log(res);
				expect(res.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							voucherName: expect.any(String),
							isActive: expect.any(Boolean),
						}),
					])
				);
			});
	});

	it("GET /vouchers/:id ---> voucher", async () => {
		return request(app)
			.get("/vouchers/6335d3084be6ec952fd0aa3b")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				// console.log(res);
				expect(res.body).toEqual(
					expect.objectContaining({
						voucherName: expect.any(String),
						isActive: expect.any(Boolean),
					})
				);
			});
	});

	// it("GET /:id ---> 404 if not found", async () => {
	// 	return request(app).get("/9999999").expect(404);
	// });

	it("POST /vouchers ---> created voucher", async () => {
		const res = await request(app).post("/vouchers").send({
			voucherName: "xyz",
			isActive: true,
		});
		expect(res.statusCode).toBe(200);
	});

	it("PATCH /vouchers/:id ---> updated voucher", async () => {
		const res = await request(app)
			.patch("/vouchers/6335d3084be6ec952fd0aa3b")
			.send({
				voucherName: "xyzw",
			});
		expect(res.statusCode).toBe(200);
	});

	it("DELETE /vouchers/:id ---> deleted voucher", async () => {
		const res = await request(app)
			.delete("/vouchers/6335d3084be6ec952fd0aa3b")
			.send({});
		expect(res.statusCode).toBe(200);
	});
});
