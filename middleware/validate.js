const validator = require('../helpers/validate');

const saveDeli = (req, res, next) => {
  const validationRule = {
    type: 'required|string',
    productName: 'required|string',
    price: 'required|string',
    calories: 'required|integer',
    quantity: 'required|integer',
    count: 'integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveProduce = (req, res, next) => {
    const validationRule = {
      department: 'required|string',
      type: 'required|string',
      color: 'required|string',
      quality: 'required|string',
      peakSeason: 'required|string',
      amountInStock: 'required|integer',
      unit: 'required|string',
      productName: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveSeasonal = (req, res, next) => {
    const validationRule = {
      department: 'required|string',
      type: 'required|string',
      color: 'required|string',
      size: 'required|string',
      season: 'required|string',
      amountInStock: 'required|integer',
      unit: 'required|string',
      productName: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveBakery = (req, res, next) => {
    const validationRule = {
      type: 'required|string',
      productName: 'required|string',
      price: 'required|string',
      allergens: 'required|string',
      servings: 'required|integer',
      count: 'required|integer'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  
  const saveEmployee = (req, res, next) => {
    const validationRule = {
      firstName: 'required|string',
      lastName: 'required|string',
      gender: 'required|string',
      personalEmail: 'required|email',
      jobTitle: 'required|string',
      workEmail: 'required|email'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
       });
      } else {
        next();
      }
    });
  };
module.exports = {
  saveDeli,
  saveProduce,
  saveBakery,
  saveEmployee, 
  saveSeasonal
};