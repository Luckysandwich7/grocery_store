// Millie's Assignment
const express = require('express');
const routes = express.Router();

const planetsController = require('../controllers/planets');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', planetsController.getAll);

routes.get('/:id', planetsController.getSingle);

routes.post('/', isAuthenticated, validation.savePlanet, planetsController.createContact);

routes.put('/:id', isAuthenticated, validation.savePlanet, planetsController.updateContact);

routes.delete('/:id', isAuthenticated, planetsController.deleteContact);

module.exports = routes;
