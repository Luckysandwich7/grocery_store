const validator = require('../helpers/validate');

const saveDeli = (req, res, next) => {
  const validationRule = {
    type: 'required|string',
    productName: 'required|string',
    price: 'required|string',
    calories: 'required|decimal',
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
      productName: 'required|string',
      department: 'required|string',
      type: 'required|string',
      color: 'required|string',
      quality: 'required|string',
      unit: 'required|string',
      peakSeason: 'required|string',
      amountInStock: 'required|integer',
      pricePerUnit: 'required|decimal'
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
      price: 'required|decimal',
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
  saveEmployee
};