
const chalk = require('chalk');
const queryDatabase = require('../dbConnection');
const moment = require('moment');

function containsCourse(courses, course) {
  for (let i in courses) {
    if (courses[i].id === course.course_number) {
      return true;
    }
  }
  return false;
}

function containsSection(course, TA) {
  course.sections.forEach(section => {
    if (section.sectionId === TA.sid) {
      return true;
    }
  });
  return false;
}

const route = {
  method: 'GET',
  path: '/getDraftStudents/{username}',
  handler: function (request, reply) {
    const username = encodeURIComponent(request.params.username);

    const coursesQuery =
    `SELECT courses.cid, courses.course_number, courses.name, courses.season, courses.year, sections.sid, sections.name AS section_name, sections.start_time, sections.end_time
    FROM courses
    JOIN belongs_to ON
    courses.cid = belongs_to.course_id
    JOIN sections ON
    belongs_to.section_id = sections.sid
    JOIN participates ON
    sections.sid = participates.section_id
    JOIN users ON
    participates.user_id = users.uid
    WHERE users.wustl_key = '${username}'`;

    queryDatabase(coursesQuery)
    .then(coursesResult => {
      let sectionList = '(';
      coursesResult.forEach(course => {
        sectionList += course.sid + ', ';
      });
      if (sectionList.length > 2) {
        sectionList = sectionList.substring(0, sectionList.length - 2);
      }
      sectionList += ')';

      const draftQuery =
      `SELECT users.wustl_key, users.first_name, users.last_name, draft.cid, draft.sid, draft.interest
      FROM users
      JOIN draft ON
      users.uid = draft.uid
      WHERE draft.sid IN ${sectionList}
      AND users.role = 0
      AND draft.interest != 'No Interest'`;

      queryDatabase(draftQuery)
      .then(draftResult => {
        draftResult.forEach(student => {
          coursesResult.forEach(course => {
            if (student.sid === course.sid) {
              const startTime = moment(course.start_time).format('h:mm A');
              const endTime = moment(course.end_time).format('h:mm A');

              student.courseName = course.name;
              student.courseNumber = course.course_number;
              student.sectionName = course.section_name;
              student.time = `${startTime} - ${endTime}`;
            }
          });
        })
        reply(draftResult);
      })
      .catch(err => {
        console.log(chalk.red(`Err: ${err}`));
      })
    })
    .catch(err => {
      console.log(chalk.red(`Err: ${err}`));
    });
  }
};

module.exports = route;
