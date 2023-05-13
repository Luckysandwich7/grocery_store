//Ryan's Assignment
const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');
const schema = Joi.object({ 
  planetName: Joi.string().required().empty(), 
  region: Joi.string().required().empty(),
  sector: Joi.string().required().empty(),
  suns: Joi.number().required().empty(), 
  moons: Joi.number().required().empty(), 
  terrain: Joi.string().required().empty()
 });

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db('cse341').collection('star_wars_planets').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid planet id to find planet') }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341').collection('star_wars_planets').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createContact = async (req, res) => {
  try { const { error } = schema.validate(req.body); if (error) { return res.status(400).json({ error: error.details[0].message }); }
    const contact = {
      planetName: req.body.planetName,
      region: req.body.region,
      sector: req.body.sector,
      suns: req.body.suns,
      moons: req.body.moons,
      terrain: req.body.terrain
    };
    console.log(req.body);

    const response = await mongodb.getDb().db('cse341').collection('star_wars_planets').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid planet id to find planet') }
    const userId = new ObjectId(req.params.id);
    const contact = {
      $set: {
        planetName: req.body.planetName,
        region: req.body.region,
        sector: req.body.sector,
        suns: req.body.suns,
        moons: req.body.moons,
        terrain: req.body.terrain
      }
    };
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('star_wars_planets')
      .updateOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid planet id to find planet') }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('star_wars_planets')
      .remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
