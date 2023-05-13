const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;
const Joi = require('joi');
const schema = Joi.object({ 
  productName: Joi.string().required().empty(), 
  department: Joi.string().required().empty(),
  type: Joi.string().required().empty(),
  color: Joi.string().required().empty(),
  quality: Joi.string().required().empty(),
  peakSeason: Joi.string().required().empty(), 
  amountInStock: Joi.int32().required().empty(), 
  pricePerUnit: Joi.decimal128().required().empty(),
  unit: Joi.string().required().empty()
 });

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db('grocery_store').collection('produce').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to find produce') }
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('grocery_store').collection('produce').find({ _id: productId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createProduct = async (req, res) => {
  try { const { error } = schema.validate(req.body); if (error) { return res.status(400).json({ error: error.details[0].message }); }
    const product = {
      productName: req.body.productName,
      department: req.body.department,
      type: req.body.type,
      color: req.body.color,
      quality: req.body.quality,
      peakSeason: req.body.peakSeason,
      amountInStock: req.body.amountInStock,
      pricePerUnit: req.body.pricePerUnit,
      unit: req.body.unit
    };
    console.log(req.body);

    const response = await mongodb.getDb().db('grocery_store').collection('produce').insertOne(product);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the product.');
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to find produce') }
    const productId = new ObjectId(req.params.id);
    const product = {
      $set: {
        productName: req.body.productName,
        department: req.body.department,
        type: req.body.type,
        color: req.body.color,
        quality: req.body.quality,
        peakSeason: req.body.peakSeason,
        amountInStock: req.body.amountInStock,
        pricePerUnit: req.body.pricePerUnit,
        unit: req.body.unit
      }
    };
    const response = await mongodb
      .getDb()
      .db('grocery_store')
      .collection('produce')
      .updateOne({ _id: productId }, product);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the product.');
    }
};

const deleteProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to find produce') }
    const productId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('grocery_store')
      .collection('produce')
      .remove({ _id: productId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the product.');
    }
  };

module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct };
