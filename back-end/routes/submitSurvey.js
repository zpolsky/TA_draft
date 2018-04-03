
const chalk = require('chalk');
const queryDatabase = require('../dbConnection');

const route = {
  method: 'POST',
  path: '/submitSurvey/',
  handler: (request, reply) => {
    const answers = [];
    for (let prop in request.payload) {
      answers.push({
        course_id: prop,
        preference: request.payload[prop]
      });
    }
    console.log('answers = ', answers)
    reply({
      message: 'Success'
    });
  }
};

module.exports = route;
