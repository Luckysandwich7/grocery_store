//Ryan's Assignment
const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllDeli = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('grocery_store').collection('deli').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  };

const getSingleDeli = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid planet id to find planet') }
    const deliId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('grocery_store').collection('deli').find({ _id: deliId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) { res.status(500).json({ message: err.message}); }
};

const createDeli = async (req, res) => {
    const deli = {
      type: req.body.type,
      productName: req.body.productName,
      price: req.body.price,
      calories: req.body.calories,
      quantity: req.body.quantity,
      count: req.body.count
    };
    console.log(req.body);
    const response = await mongodb.getDb().db('grocery_store').collection('deli').insertOne(deli);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the product.');
    }
};

const updateDeli = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid deli id to find product') }
    const deliId = new ObjectId({ id: req.params.id });
    const deli = {
        type: req.body.type,
        productName: req.body.productName,
        price: req.body.price,
        calories: req.body.calories,
        quantity: req.body.quantity,
        count: req.body.count
    };
    const response = await mongodb
      .getDb()
      .db('grocery_store')
      .collection('deli')
      .replaceOne({ _id: deliId }, deli);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the product.');
    }
};

const deleteDeli = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid deli id to find deli item') }
    const deliId = new ObjectId({ id: req.params.id});
    const response = await mongodb
      .getDb()
      .db('grocery_store')
      .collection('deli')
      .remove({ _id: deliId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the product.');
    }
  };

module.exports = { getAllDeli, getSingleDeli, createDeli, updateDeli, deleteDeli };
