
const chalk = require('chalk');
const queryDatabase = require('../dbConnection');

const route = {
  method: 'POST',
  path: '/submitSurvey/{username}',
  handler: (request, reply) => {
    const username = encodeURIComponent(request.params.username);

    const answers = [];
    for (let prop in request.payload) {
      const info = request.payload[prop];
      answers.push({
        cid: info.course_id,
        sid: info.section_id,
        preference: info.preference
      });
    }
    const userQuery = `SELECT uid FROM users WHERE wustl_key='${username}'`;
    queryDatabase(userQuery)
    .then(userResult => {
      const uid = userResult[0].uid;
      const queryValuesArray = answers.map(answer => {
        const { cid, sid, preference } = answer;
        return `(${uid}, ${cid}, ${sid}, "${preference}")`
      });
      let queryValues = '';
      queryValuesArray.forEach(value => {
        queryValues += value + ', ';
      });
      if (queryValues.length > 2) {
        queryValues = queryValues.substring(0, queryValues.length - 2);
      } 
      const submitQuery = `INSERT INTO draft (uid, cid, sid, interest) VALUES ${queryValues}`;
      queryDatabase(submitQuery)
      .then(result => {
        reply({
          message: 'Success'
        });
      });
    });
  }
};

module.exports = route;
