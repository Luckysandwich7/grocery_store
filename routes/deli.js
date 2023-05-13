//Ryan's Assignment
const express = require('express');
const routes = express.Router();

const deliController = require('../controllers/deli');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', deliController.getAllDeli);

routes.get('/:id', deliController.getSingleDeli);

routes.post('/', isAuthenticated, validation.saveDeli, deliController.createDeli);

routes.put('/:id', isAuthenticated, validation.saveDeli, deliController.updateDeli);

routes.delete('/:id', isAuthenticated, deliController.deleteContact);

module.exports = routes;
