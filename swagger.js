const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Grocery Store API',
    description: 'Grocery Store API'
  },

  host: 'cte341-final-project.onrender.com',
  schemes: ['https'],
  tags: [
    {
      "name": "Employees",
      "description": "Add or make edits to the Employee Collection in the Grocery Store Database"
    },
    {
      "name": "Bakery",
      "description": "Add or make edits to the Bakery Items in the Grocery Store Database"
    },
    {
      "name": "Deli",
      "description": "Add or make edits to the Deli Items in the Grocery Store Database"
    },
    {
      "name": "Produce",
      "description": "Add or make edits to the Bakery Items in the Grocery Store Database"
    } 
  ]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
