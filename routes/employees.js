// Peace's Assignment

const express = require('express');
const routes = express.Router();

const employeesController = require('../controllers/employees');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");



routes.get('/', employeesController.getAll);

routes.get('/:id', employeesController.getSingle);

routes.post('/', isAuthenticated, validation.saveCharacter, employeesController.createContact);

routes.put('/:id', isAuthenticated, validation.saveCharacter, employeesController.updateContact);

routes.delete('/:id', isAuthenticated, employeesController.deleteContact);

module.exports = routes;


