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

const saveCharacter = (req, res, next) => {
    const validationRule = {
      firstName: 'required|string',
      lastName: 'required|string',
      gender: 'required|string',
      race: 'required|string',
      vehicle: 'required|string',
      affiliation: 'required|string'
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
  saveCharacter
};