
const chalk = require('chalk');
const queryDatabase = require('../dbConnection');


const route = {
  method: 'GET',
  path: '/checkLogin/u={username}_p={password}',
  handler: function (request, reply) {
    const username = encodeURIComponent(request.params.username);
    const password = encodeURIComponent(request.params.password);
    const loginQuery =
    `SELECT surveyCompleted, isActive, uid, role
    FROM users
    WHERE wustl_key = '${username}' AND password = '${password}'`;
    queryDatabase(loginQuery)
    .then(result => {
      const success = (result.length === 1);
      if (success) {
        const user = result[0];
        reply({
          success,
          username,
          uid: user.uid,
          surveyCompleted: user.surveyCompleted === 1,
          isActive: user.isActive === 1,
          role: user.role
        });
      } else {
        reply({
          success,
          username
        });
      }
    })
    .catch(err => {
      console.log(chalk.red(`Err: ${err}`));
    });
  }
};


module.exports = route;
