const express = require('express');
const routes = express.Router();

const bakeryController = require('../controllers/bakery');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', bakeryController.getAll);

routes.get('/:id', bakeryController.getSingle);

routes.post('/', isAuthenticated, validation.savePlanet, bakeryController.createContact);

routes.put('/:id', isAuthenticated, validation.savePlanet, bakeryController.updateContact);

routes.delete('/:id', isAuthenticated, bakeryController.deleteContact);

module.exports = routes;
