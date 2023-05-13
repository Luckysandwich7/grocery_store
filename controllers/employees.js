// Peace's Assignment

const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

    const result = await mongodb.getDb().db('cse341').collection('employees').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid employee id to find employee') }
    const userId = new ObjectId(req.params.id);
    console.log(userId);
    const result = await mongodb.getDb().db('cse341').collection('employees').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createEmployee = async (req, res) => {
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      personalEmail: req.body.personalEmail,
      jobTitle: req.body.jobTitle,
      workEmail: req.body.workEmail
    };
    console.log(req.body);

    const response = await mongodb.getDb().db('cse341').collection('employees').insertOne(employee);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Employee Deleted.');
    }
  };

const updateEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid employee id to find employee') }
    const userId = new ObjectId(req.params.id);
    const employee = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        personalEmail: req.body.personalEmail,
        jobTitle: req.body.jobTitle,
        workEmail: req.body.workEmail
      }
    };
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('employees')
      .updateOne({ _id: userId }, employee);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send('Response Received');
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the employee.');
    }
};

const deleteEmployee = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid employee id to find employee') }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('cse341')
      .collection('employees')
      .remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the employee.');
    }
  };

module.exports = { getAll, getSingle, createEmployee, updateEmployee, deleteEmployee };
