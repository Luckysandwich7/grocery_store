const Controller = require('../controllers/');
const createControllerTests = require('./test');

//  Controller Tests
describe(' Controller', () => {
  createControllerTests(Controller.getAll);
  createControllerTests(Controller.getSingle);
  createControllerTests(Controller.create);
  createControllerTests(Controller.update);
  createControllerTests(Controller.delete);
});