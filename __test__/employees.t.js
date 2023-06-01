const employeesController = require('../controllers/employees');
const { createControllerTests, getAllTest} = require('./test');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

//  Controller Tests
describe(' Controller', () => {
  createControllerTests(Controller.getAll);
  createControllerTests(Controller.getSingle);
  createControllerTests(Controller.create);
  createControllerTests(Controller.update);
  createControllerTests(Controller.delete);
});

const employeesController = require('../controllers/employees');
const { createControllerTests, getAllTest} = require('./test');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

jest.mock('mongodb');

//  Deli Controller Tests
describe(' Deli Controller', () => {
  createControllerTests(employeesController.getAll);
  getAllTest(employeesController, employeesController.getAll);
  createControllerTests(employeesController.getAll);
  createControllerTests(employeesController.getSingle);
  createControllerTests(employeesController.createEmployee);
  createControllerTests(employeesController.updateEmployee);
  createControllerTests(employeesController.deleteEmployee);
});