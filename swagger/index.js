const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: 'Contacts',
    description: 'Api for managing contacts for my CSE341'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger/swagger.json'
const routes = ['./routes/index', './routes/contacts'];

swaggerAutogen(outputFile, routes, doc)