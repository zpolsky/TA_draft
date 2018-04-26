
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

const route = {
  method: 'GET',
  path: '/getAllCourses/',
  handler: function (request, reply) {
    const allCoursesQuery =
    `SELECT courses.cid, courses.course_number, courses.name, courses.season, courses.year, sections.sid, sections.name AS section_name, sections.start_time, sections.end_time
    FROM courses
    JOIN belongs_to ON
    courses.cid = belongs_to.course_id
    JOIN sections ON
    belongs_to.section_id = sections.sid`;

    queryDatabase(allCoursesQuery)
    .then(result => {
      const courses = result.map(course => {
        return {
          cid: course.cid,
          id: course.course_number,
          courseName: course.name,
          sid: course.sid,
          sectionName: course.section_name,
          startTime: moment(course.start_time).format('h:mm A'),
          endTime: moment(course.end_time).format('h:mm A')
        };
      });
      reply(courses);
    })
    .catch(err => {
      console.log(chalk.red(`Err: ${err}`));
    });
  }
};

module.exports = route;
