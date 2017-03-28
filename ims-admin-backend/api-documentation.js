const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Info message service',
      version: '1.0.0',
    },
  },
  apis: ['./routing.js'],
};

module.exports = {
  applyMiddleware: function applyMiddleware(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
  }
};