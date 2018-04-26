
const chalk = require('chalk');
const queryDatabase = require('../dbConnection');

const route = {
  method: 'GET',
  path: '/getSurveyAnswers/{uid}',
  handler: function (request, reply) {
    const uid = encodeURIComponent(request.params.uid);

    const surveyQuery = `SELECT draft.uid, draft.cid, draft.sid, draft.interest, sections.name as sectionName, courses.course_number
    FROM draft
    JOIN sections ON sections.sid = draft.sid
    JOIN courses ON courses.cid = draft.cid
    WHERE uid = ${uid}`;

    queryDatabase(surveyQuery)
    .then(surveyResult => {
      reply(surveyResult);
    })
    .catch(err => {
      console.log(chalk.red(`Err: ${err}`));
    });
  }
};

module.exports = route;
