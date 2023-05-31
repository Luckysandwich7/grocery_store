const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
    let connection;
    let db;
    let groceryId;
    let mockUser;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('grocery_store')
    });

    afterAll(async () => {
        await connection.close()
    });

    test("responds to /deli", async () => {
        const res = await request.get("/deli");
        expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
        expect(res.statusCode).toBe(200);
    });

    it('should insert a new deli into the deli collection', async () => {
        const delis = db.collection('deli');

        const mockUser = {
            // id: 'some-user-id',
            // firstName: "Emily",
            // lastName: "Button",
            // email: "emilyButton@gmail.com",
            // age: 25,

            type: "sandwich",
            productName: "PBJ Sandwich",
            price: "10.00",
            calories: 560,
            quantity: 10,
            count: "0"

        };

        const createdDeli = await delis.insertOne(mockUser);
        groceryId = createdDeli.insertedId;
    });

    test("Finds deli", async () => {
        const delis = db.collection("deli");
        //console.log(createdUser.insertedId);

        const insertedDeli = await delis.findOne({ _id: groceryId });
        expect(insertedDeli).toEqual(mockUser);
    });

    test("Updates deli", async () => {
        const updateDeli = {
            type: "delitest1",
            productName: "testign the deli",
            price: "10.00",
            calories: 560,
            quantity: 10,
            count: "0"
        };
        const delis = db.collection("delis");
        //console.log(createdUser.insertedId);

        const updatedDeli = await delis.replaceOne({ _id: groceryId }, updateDeli);
        expect(updatedDeli.acknowledged).toEqual(true);
        expect(updatedDeli.matchedCount).toEqual(1);
    });

//     await users.insertOne(mockUser)

//     const insertedDeli = await users.findOne({ _id: 'grocery-id' });

//     expect(insertedDeli).toEqual(mockUser)
// },

    it('should delete a deli from the delis collection', async () => {
        const delis = db.collection('delis')
        await delis.deleteMany({ id: 'grocery-id' })
        const deletedDeli = await users.findOne({ _id: 'groceery-id' });
        expect(deletedDeli).toEqual(null)
    })
);




















const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const app = require("../app");
const supertest = require("supertest");
const { expect } = require("@jest/globals");
const { updateUser } = require("../controllers/users");
const request = supertest(app);

//Users collection
describe("User collection tests", () => {
  let connection;
  let db;
  let docId;
  let mockUser;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("cse341_restaurant_app");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("responds to /users", async () => {
    const res = await request.get("/users");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("Creates a new user", async () => {
    const users = db.collection("users");

    mockUser = {
      name: "Test",
      lastName: "User",
      nickname: "test.user",
      email: "test.user@email.com",
      yearsOfWorking: 10,
      gender: 1,
      userType: 1,
    };

    const createdUser = await users.insertOne(mockUser);
    docId = createdUser.insertedId;
  });

  test("Finds user", async () => {
    const users = db.collection("users");
    //console.log(createdUser.insertedId);

    const insertedUser = await users.findOne({ _id: docId });
    expect(insertedUser).toEqual(mockUser);
  });

  test("Updates user", async () => {
    const updateUser = {
      name: "Test2",
      lastName: "User2",
      nickname: "test2.user",
      email: "test2.user@email.com",
      yearsOfWorking: 5,
      gender: 2,
      userType: 2,
    };
    const users = db.collection("users");
    //console.log(createdUser.insertedId);

    const updatedUser = await users.replaceOne({ _id: docId }, updateUser);
    expect(updatedUser.acknowledged).toEqual(true);
    expect(updatedUser.matchedCount).toEqual(1);
  });

  test("Deletes user", async () => {
    const users = db.collection("users");

    const deletedUser = await users.deleteOne({ _id: docId }, true);
    expect(deletedUser.acknowledged).toEqual(true);
  });
});

//Customers collection
describe("Customer collection tests", () => {
  let connection;
  let db;
  let docId;
  let mockCustomer;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("cse341_restaurant_app");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("responds to /customers", async () => {
    const res = await request.get("/customers");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("Creates a new customer", async () => {
    const customers = db.collection("customers");

    mockCustomer = {
      userName: "User Test",
      googleId: 1234512345,
      email: "user.test@email.com",
    };

    const createdCustomer = await customers.insertOne(mockCustomer);
    docId = createdCustomer.insertedId;
  });

  test("Finds customer", async () => {
    const customers = db.collection("customers");
    //console.log(createdCustomer.insertedId);

    const insertedCustomer = await customers.findOne({ _id: docId });
    expect(insertedCustomer).toEqual(mockCustomer);
  });

  test("Updates customer", async () => {
    const updateCustomer = {
      userName: "User Test 2",
      googleId: 1234512344,
      email: "user.test2@email.com",
    };
    const customers = db.collection("customers");
    //console.log(createdCustomer.insertedId);

    const updatedCustomer = await customers.replaceOne(
      { _id: docId },
      updateCustomer
    );
    expect(updatedCustomer.acknowledged).toEqual(true);
    expect(updatedCustomer.matchedCount).toEqual(1);
  });

  test("Deletes customer", async () => {
    const customers = db.collection("customers");

    const deletedCustomer = await customers.deleteOne({ _id: docId }, true);
    expect(deletedCustomer.acknowledged).toEqual(true);
  });
});

//Orders collection
describe("Order collection tests", () => {
  let connection;
  let db;
  let docId;
  let mockOrder;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("cse341_restaurant_app");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("responds to /orders", async () => {
    const res = await request.get("/orders");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("Creates a new order", async () => {
    const orders = db.collection("orders");

    mockOrder = {
      customerId: 123451,
      orderDate: Date.now(),
      totalPrice: 12123,
      paymentMethod: "Cash",
      paymentStatus: "Completed",
      shippingAddress: "Anywhere 23, Some place, Some city",
      shippingStatus: "Sent",
    };

    const createdOrder = await orders.insertOne(mockOrder);
    docId = createdOrder.insertedId;
  });

  test("Finds order", async () => {
    const orders = db.collection("orders");
    //console.log(createdOrder.insertedId);

    const insertedOrder = await orders.findOne({ _id: docId });
    expect(insertedOrder).toEqual(mockOrder);
  });

  test("Updates order", async () => {
    const updateOrder = {
      customerId: 123452,
      orderDate: Date.now(),
      totalPrice: 12122,
      paymentMethod: "Credit Card",
      paymentStatus: "Waiting for approval",
      shippingAddress: "Anywhere 33, Some place, Some city",
      shippingStatus: "Waiting for payment",
    };
    const orders = db.collection("orders");
    //console.log(createdOrder.insertedId);

    const updatedOrder = await orders.replaceOne({ _id: docId }, updateOrder);
    expect(updatedOrder.acknowledged).toEqual(true);
    expect(updatedOrder.matchedCount).toEqual(1);
  });

  test("Deletes order", async () => {
    const orders = db.collection("orders");

    const deletedOrder = await orders.deleteOne({ _id: docId }, true);
    expect(deletedOrder.acknowledged).toEqual(true);
  });
});

//Menu collection
describe("Menu collection tests", () => {
  let connection;
  let db;
  let docId;
  let mockMenu;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("cse341_restaurant_app");
  });

  afterAll(async () => {
    await connection.close();
  });

  test("responds to /menus", async () => {
    const res = await request.get("/menus");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("Creates a new menu", async () => {
    const menus = db.collection("menu");

    mockMenu = {
      name: "Menu Name",
      description: "Menu description",
      price: 1234,
      category: "Vegan",
      availability: 1,
    };

    const createdMenu = await menus.insertOne(mockMenu);
    docId = createdMenu.insertedId;
  });

  test("Finds menu", async () => {
    const menus = db.collection("menu");
    //console.log(createdMenu.insertedId);

    const insertedMenu = await menus.findOne({ _id: docId });
    expect(insertedMenu).toEqual(mockMenu);
  });

  test("Updates menu", async () => {
    const updateMenu = {
      name: "Menu Name 2",
      description: "Menu description 2",
      price: 12345,
      category: "Vegan 2",
      availability: 0,
    };
    const menus = db.collection("menu");
    //console.log(createdMenu.insertedId);

    const updatedMenu = await menus.replaceOne({ _id: docId }, updateMenu);
    expect(updatedMenu.acknowledged).toEqual(true);
    expect(updatedMenu.matchedCount).toEqual(1);
  });

  test("Deletes menu", async () => {
    const menus = db.collection("menu");

    const deletedMenu = await menus.deleteOne({ _id: docId }, true);
    expect(deletedMenu.acknowledged).toEqual(true);
  });
});