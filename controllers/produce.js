const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('grocery_store').collection('produce').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid product id to find produce') }
      const productId = new ObjectId(req.params.id);
      const result = await mongodb.getDb().db('grocery_store').collection('produce').find({ _id: productId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createProduct = async (req, res) => {
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
};

const updateProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to find produce') }
    const productId = new ObjectId({ id: req.params.id });
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
    const productId = new ObjectId({ id: req.params.id });
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
