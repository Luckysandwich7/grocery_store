const server = require("../server");
const supertest = require("supertest");
const { expect } = require("@jest/globals");
const request = supertest(server);

describe("Test Handlers", () => {
  test("responds to post /employees", async () => {
    const res = await request.post("/employees").send({
      firstName: "",
      lastName: "",
      gender: "",
      personalEmail: "",
      jobTitle: "",
      workEmail: "",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });
  test("responds to post /bakery", async () => {
    const res = await request.post("/bakery").send({
      type: "",
      productName: "",
      price: "",
      allergens: "",
      servings: "",
      count: "",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });
  test("responds to post /deli", async () => {
    const res = await request.post("/deli").send({
      type: "sandwich",
      productName: "Bobs Burgers",
      price: "9.99",
      calories: "1000",
      quantity: "10",
      count: "40",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });
  test("responds to post /produce", async () => {
    const res = await request.post("/produce").send({
      department: "",
      type: "",
      color: "",
      quality: "",
      peakSeason: "",
      amountInStock: "",
      unit: "",
      productName: "",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });
});
