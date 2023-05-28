const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
// #swagger.tags=['Seasonal']
// #swagger.summary=Get full Seasonal list
// #swagger.description=Get all Seasonal Items from the Seasonal Collection, Creates multiple Seasonal Items
  try {
    const result = await mongodb.getDb().db('grocery_store').collection('seasonal').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const getSingle = async (req, res) => {
 // #swagger.tags=['Seasonal']
// #swagger.summary=Get Single Seasonal list
// #swagger.description=Get a Single Seasonal item from the Seasonal Collection
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid product id to find seasonal item') }
      const productId = new ObjectId(req.params.id);
      const result = await mongodb.getDb().db('grocery_store').collection('seasonal').find({ _id: productId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createProduct = async (req, res) => {
  // #swagger.tags=['Seasonal']
  // #swagger.summary= Create a new Seasonal item
  // #swagger.description=Create a new Seasonal item from the Seasonal Collection
  const product = {
    department: req.body.department,
    type: req.body.type,
    color: req.body.color,
    size: req.body.size,
    season: req.body.season,
    amountInStock: req.body.amountInStock,
    unit: req.body.unit,
    productName: req.body.productName
  };
  console.log(req.body);
  const response = await mongodb.getDb().db('grocery_store').collection('seasonal').insertOne(product);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the product.');
  }
};

const updateProduct = async (req, res) => {
   // #swagger.tags=['Seasonal']
  // #swagger.summary= Modify a Seasonal item
  // #swagger.description=Modify a Seasonal item from the Seasonal Collection
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to find seasonal item') 
  }
  const productId = new ObjectId({ id: req.params.id });
  const product = {
    department: req.body.department,
    type: req.body.type,
    color: req.body.color,
    size: req.body.size,
    season: req.body.season,
    amountInStock: req.body.amountInStock,
    unit: req.body.unit,
    productName: req.body.productName
  };
  const response = await mongodb
    .getDb()
    .db('grocery_store')
    .collection('seasonal')
    .replaceOne({ _id: productId }, product);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the product.');
  }
};

const deleteProduct = async (req, res) => {
  // #swagger.tags=['seasonal']
  // #swagger.summary= Delete a seasonal item
  // #swagger.description=Delete a seasonal item from the seasonal Collection
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to find seasonal item') 
  }
  const productId = new ObjectId({ id: req.params.id });
  const response = await mongodb
      .getDb()
      .db('grocery_store')
      .collection('seasonal')
      .deleteOne({ _id: productId }, true);
    console.log(response);
  if (response.deletedCount > 0) {
      res.status(200).send();
  } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the product.');
  }
};

module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct };
