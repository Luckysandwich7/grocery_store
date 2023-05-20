
const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');
const schema = Joi.object({ 
  type: Joi.string().required().empty(), 
  productName: Joi.string().required().empty(),
  price: Joi.string().required().empty(),
  allergens: Joi.string().required().empty(), 
  servings: Joi.number().required().empty(),
  count: Joi.number().required().empty()
 });

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db('grocery_store').collection('bakery').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid bakery item id to find item') }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('grocery_store').collection('bakery').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createBakeryItem = async (req, res) => {
  try { const { error } = schema.validate(req.body); if (error) { return res.status(400).json({ error: error.details[0].message }); }
    const bakeryItem = {
      type: req.body.type,
      productName: req.body.productName,
      price: req.body.price,
      allergens: req.body.allergens,
      servings: req.body.servings, 
      count: req.body.count
    };
    console.log(req.body);

    const response = await mongodb.getDb().db('grocery_store').collection('bakery').insertOne(bakeryItem);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the item.');
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateBakeryItem = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid bakery item id to find item') }
    const userId = new ObjectId(req.params.id);
    const bakeryItem = {
      $set: {
        type: req.body.type,
        productName: req.body.productName,
        price: req.body.price,
        allergens: req.body.allergens,
        servings: req.body.servings,
        count: req.body.count,
      }
    };
    const response = await mongodb
      .getDb()
      .db('grocery_store')
      .collection('bakery')
      .updateOne({ _id: userId }, bakeryItem);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the bakery item.');
    }
};

const deleteBakeryItem = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid bakery item id to find bakery item') }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('grocery_store')
      .collection('bakery')
      .remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the bakery item.');
    }
  };

module.exports = { getAll, getSingle, createBakeryItem, updateBakeryItem, deleteBakeryItem };

//Sheyla's assignment
