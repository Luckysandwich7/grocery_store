const express = require('express');
const routes = express.Router();

const bakeryController = require('../controllers/bakery');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', bakeryController.getAll);

routes.get('/:id', bakeryController.getSingle);

routes.post('/', isAuthenticated, validation.saveBakery, bakeryController.createBakeryItem);

routes.put('/:id', isAuthenticated, validation.saveBakery, bakeryController.updateBakeryItem);

routes.delete('/:id', isAuthenticated, bakeryController.deleteBakeryItem);

module.exports = routes;
