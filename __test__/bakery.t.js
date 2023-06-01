const bakeryController = require('../controllers/bakery');
const { createControllerTests, getAllTest} = require('./test');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

jest.mock('mongodb');

// Bakery Controller Tests
describe('bakery Controller', () => {
  //createControllerTests(bakeryController.findAllbakery);
  getAllTest(bakeryController, bakeryController.getAll);
  createControllerTests(bakeryController.getSingle);
  createControllerTests(bakeryController.createBakeryItem);
  createControllerTests(bakeryController.updateBakeryItem);
  createControllerTests(bakeryController.deleteBakeryItem);
});

