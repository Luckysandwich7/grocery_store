//Ryan's Assignment
const express = require('express');
const routes = express.Router();

const deliController = require('../controllers/deli');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', deliController.getAll);

routes.get('/:id', deliController.getSingle);

routes.post('/', isAuthenticated, validation.saveDeli, deliController.createContact);

routes.put('/:id', isAuthenticated, validation.saveDeli, deliController.updateContact);

routes.delete('/:id', isAuthenticated, deliController.deleteContact);

module.exports = routes;
