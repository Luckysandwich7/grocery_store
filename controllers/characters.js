
const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

    const result = await mongodb.getDb().db('cse341').collection('star_wars_characters').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid planet id to find planet') }
    const userId = new ObjectId(req.params.id);
    console.log(userId);
    const result = await mongodb.getDb().db('cse341').collection('star_wars_characters').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createContact = async (req, res) => {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      race: req.body.race,
      vehicle: req.body.vehicle,
      affiliation: req.body.affiliation
    };
    console.log(req.body);

    const response = await mongodb.getDb().db('cse341').collection('star_wars_characters').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Character Deleted.');
    }
  };

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid planet id to find planet') }
    const userId = new ObjectId(req.params.id);
    const contact = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        race: req.body.race,
        vehicle: req.body.vehicle,
        affiliation: req.body.affiliation
      }
    };
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('star_wars_characters')
      .updateOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send('Response Received');
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
      .collection('star_wars_characters')
      .remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
