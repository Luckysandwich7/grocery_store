const produceController = require('../controllers/produce');
const { createControllerTests, getAllTest} = require('./test');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

jest.mock('mongodb');

//  Deli Controller Tests
describe(' Deli Controller', () => {
  createControllerTests(deliController.findAllDeli);
  getAllTest(deliController, deliController.getAll);
  createControllerTests(deliController.getAll);
  createControllerTests(deliController.getSingle);
  createControllerTests(deliController.createProduct);
  createControllerTests(deliController.updateProduct);
  createControllerTests(deliController.deleteProduct);
});