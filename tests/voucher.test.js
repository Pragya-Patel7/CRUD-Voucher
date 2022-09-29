const request = require("supertest");
const app = require("../server");

describe("Voucher API", () => {
	it("GET / ---> array vouchers", async () => {
		return request(app)
			.get("/")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				// console.log(res);
				expect(res.body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							couponCode: expect.any(String),
							isActive: expect.any(Boolean),
						}),
					])
				);
			});
	});

	it("GET /:id ---> voucher", async () => {
		return request(app)
			.get("/6333235b64e1f1dcbf5a732f")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((res) => {
				// console.log(res);
				expect(res.body).toEqual(
					expect.objectContaining({
						couponCode: expect.any(String),
						isActive: expect.any(Boolean),
					})
				);
			});
	});

	// it("GET /:id ---> 404 if not found", async () => {
	// 	return request(app).get("/9999999").expect(404);
	// });

	it("POST / ---> created voucher", async () => {
		const res = await request(app).post("/").send({
			couponCode: "xyz",
			isActive: true,
		});
		expect(res.statusCode).toBe(200);
	});

	it("PATCH /:id ---> updated voucher", async () => {
		const res = await request(app).patch("/6333235b64e1f1dcbf5a732f").send({
			couponCode: "xyzw",
		});
		expect(res.statusCode).toBe(200);
	});

	it("POST /:id ---> deleted voucher", async () => {
		const res = await request(app).delete("/6333235b64e1f1dcbf5a732f").send({});
		expect(res.statusCode).toBe(200);
	});
});
