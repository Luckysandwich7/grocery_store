const seasonalController = require('../controllers/seasonal');
const { createControllerTests, getAllTest} = require('./test');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

jest.mock('mongodb');

//  seasonal Controller Tests
describe(' seasonal Controller', () => {
  getAllTest(seasonalController, seasonalController.getAll);
  createControllerTests(seasonalController.getSingle);
  createControllerTests(seasonalController.createProduct);
  createControllerTests(seasonalController.updateProduct);
  createControllerTests(seasonalController.deleteProduct);
});