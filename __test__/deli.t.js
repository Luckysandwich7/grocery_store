const deliController = require('../controllers/deli');
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
  createControllerTests(deliController.createDeli);
  createControllerTests(deliController.updateDeli);
  createControllerTests(deliController.deleteDeli);
});