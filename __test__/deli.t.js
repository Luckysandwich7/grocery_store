const deliController = require('../controllers/deli');
const { createControllerTests, getAllTest} = require('./test');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

jest.mock('mongodb');

//  Deli Controller Tests
describe(' Deli Controller', () => {
  createControllerTests(deliController.getAllDeli);
  getAllTest(deliController, deliController.getAllDeli);
  createControllerTests(deliController.getAllDeli);
  createControllerTests(deliController.getSingleDeli);
  createControllerTests(deliController.createDeli);
  createControllerTests(deliController.updateDeli);
  createControllerTests(deliController.deleteDeli);
});