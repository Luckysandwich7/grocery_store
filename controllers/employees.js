// Peace's Assignment

const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
  // #swagger.tags=['Employee']
  // #swagger.summary=Get full employee list
  // #swagger.description=To get all Employee, Create multiple Employees

  const result = await mongodb.getDb().db('grocery_store').collection('employees').find();
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
  // #swagger.tags=['Employee']
  // #swagger.summary=Get employee by Id
  // #swagger.description=To get an Employee by Id, Create an Employee
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid employee id to find employee')
  }
  const userId = new ObjectId(req.params.id);
  console.log(userId);
  const result = await mongodb.getDb().db('grocery_store').collection('employees').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
};

const createEmployee = async (req, res) => {
  // #swagger.tags=['Employee']
  // #swagger.summary=Create new Employee
  // #swagger.description=Adds a new Employee to the database
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    personalEmail: req.body.personalEmail,
    jobTitle: req.body.jobTitle,
    workEmail: req.body.workEmail
  };
  console.log(req.body);

  const response = await mongodb.getDb().db('grocery_store').collection('employees').insertOne(employee);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Employee Deleted.');
  }
};

const updateEmployee = async (req, res) => {
  // #swagger.tags=['Employee']
  // #swagger.summary=Update employee by Id
  // #swagger.description=To update an Employee by Id, create an Employee
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid employee id to find employee')
  }
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
    .db('grocery_store')
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
  // #swagger.tags=['Employee']
  // #swagger.summary=Deletes employee by Id
  // #swagger.description=To delete an Employee by Id, create an Employee
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid employee id to find employee')
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('grocery_store')
    .collection('employees')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the employee.');
  }
};

module.exports = { getAll, getSingle, createEmployee, updateEmployee, deleteEmployee };
