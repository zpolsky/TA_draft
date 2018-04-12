
const chalk = require('chalk');
const queryDatabase = require('../dbConnection');

const route = {
  method: 'GET',
  path: '/checkLogin/u={username}_p={password}',
  handler: function (request, reply) {
    const username = encodeURIComponent(request.params.username);
    const password = encodeURIComponent(request.params.password);
    const loginQuery =
    `SELECT COUNT(*), surveyCompleted, isActive, uid
    FROM users
    WHERE wustl_key = '${username}' AND password = '${password}'`;
    queryDatabase(loginQuery)
    .then(result => {
      const num = result[0]['COUNT(*)'];
      const success = (num === 1);
      reply({
        success,
        username,
        // uid: result[0].uid,
        // surveyCompleted: result[0].surveyCompleted,
        // isActive: result[0].isActive
      });
    })
    .catch(err => {
      console.log(chalk.red(`Err: ${err}`));
    });
  }
};


module.exports = route;
