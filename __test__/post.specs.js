const server = require("../server");
const supertest = require("supertest");
const { expect } = require("@jest/globals");
const request = supertest(server);

describe("Test Handlers", () => {
  test("responds to post /employees", async () => {
    const res = await request.post("/employees").send({
      firstName: "Shawn",
      lastName: " Porter",
      gender: "male",
      personalEmail: "sp@test.edu",
      jobTitle: "programmer extraordinaire",
      workEmail: "sp@tester",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });
  test("responds to post /bakery", async () => {
    const res = await request.post("/bakery").send({
      type: "cinnemon rolls",
      productName: "rolls",
      price: "3.00",
      allergens: "gluton",
      servings: "4",
      count: "8",
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
      department: "produce",
      type: "greens",
      color: "yellow",
      quality: "superior",
      peakSeason: "June",
      amountInStock: "20",
      unit: "bunch",
      productName: "Yellow Bell Pepper",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });
  test("responds to post /seasonal", async () => {
    const res = await request.post("/seasonal").send({
      department: "seasonal",
      type: "pool supply",
      color: "blue",
      size: "medium",
      season: "Summer",
      amountInStock: "32",
      unit: "single",
      productName: "Blue Pool Noodle",
    });
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(201);
  });
});
