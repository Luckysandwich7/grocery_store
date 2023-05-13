const express = require('express');
const routes = express.Router();

const charactersController = require('../controllers/characters');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");



routes.get('/', charactersController.getAll);

routes.get('/:id', charactersController.getSingle);

routes.post('/', isAuthenticated, validation.saveCharacter, charactersController.createContact);

routes.put('/:id', isAuthenticated, validation.saveCharacter, charactersController.updateContact);

routes.delete('/:id', isAuthenticated, charactersController.deleteContact);

module.exports = routes;
