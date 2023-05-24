
const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags=['Bakery']
  // #swagger.summary=Get full bakery item list
  // #swagger.description=To get all bakery item, Create multiple bakery items
    const result = await mongodb.getDb().db('grocery_store').collection('bakery').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingle = async (req, res) => {
    // #swagger.tags=['Bakery']
  // #swagger.summary=Get bakery item by Id
  // #swagger.description=To get a bakery item by Id, Create a bakery item
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
   // #swagger.tags=['Bakery']
  // #swagger.summary=Create new bakery item
  // #swagger.description=Adds a new bakery item to the database
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
};

const updateBakeryItem = async (req, res) => {
   // #swagger.tags=['Bakery']
  // #swagger.summary=Update bakery item by Id
  // #swagger.description=To update a bakery item by Id, create a bakery item
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid bakery item id to find item') }
    const userId = new ObjectId({id:req.params.id});
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
      .replaceOne({ _id: userId }, bakeryItem);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the bakery item.');
    }
};

const deleteBakeryItem = async (req, res) => {
   // #swagger.tags=['Bakery']
  // #swagger.summary=Deletes bakery item by Id
  // #swagger.description=To delete a bakery item by Id, create a bakery item
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid bakery item id to find bakery item') }
    const userId = new ObjectId({id:req.params.id});
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
