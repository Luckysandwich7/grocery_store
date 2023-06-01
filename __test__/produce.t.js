const produceController = require('../controllers/produce');
const { createControllerTests, getAllTest} = require('./test');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

jest.mock('mongodb');

//  Produce Controller Tests
describe(' Produce Controller', () => {
  createControllerTests(produceController.findAllProduce);
  getAllTest(produceController, produceController.findAllProduce);
  createControllerTests(produceController.getAll);
  createControllerTests(produceController.getSingle);
  createControllerTests(produceController.createProduct);
  createControllerTests(produceController.updateProduct);
  createControllerTests(produceController.deleteProduct);
});