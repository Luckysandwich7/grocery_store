const express = require('express');
const routes = express.Router();

const seasonalController = require('../controllers/seasonal');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', seasonalController.getAll);

routes.get('/:id', seasonalController.getSingle);

routes.post('/', isAuthenticated, validation.saveSeasonal, seasonalController.createProduct);

routes.put('/:id', isAuthenticated, validation.saveSeasonal, seasonalController.updateProduct);

routes.delete('/:id', isAuthenticated, seasonalController.deleteProduct);

module.exports = routes;