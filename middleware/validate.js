const validator = require('../helpers/validate');

const savePlanet = (req, res, next) => {
  const validationRule = {
    planetName: 'required|string',
    region: 'required|string',
    sector: 'required|string',
    suns: 'required|integer',
    moons: 'required|integer',
    terrain: 'string'
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
  savePlanet,
  saveCharacter
};