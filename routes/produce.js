const express = require('express');
const routes = express.Router();

const produceController = require('../controllers/produce');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', produceController.getAll);

routes.get('/:id', produceController.getSingle);

routes.post('/', isAuthenticated, validation.saveProduce, produceController.createProduct);

routes.put('/:id', isAuthenticated, validation.saveProduce, produceController.updateProduct);

routes.delete('/:id', isAuthenticated, produceController.deleteProduct);

module.exports = routes;
