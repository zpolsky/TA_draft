
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
  path: '/getCourses/{username}',
  handler: function (request, reply) {
    const username = encodeURIComponent(request.params.username);

    const coursesQuery =
    `SELECT courses.course_number, courses.name, courses.season, courses.year, sections.sid, sections.name AS section_name, sections.start_time, sections.end_time
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
      let courses = [];
      coursesResult.forEach(course => {
        if (!containsCourse(courses, course)) {
          courses.push({
            id: course.course_number,
            courseName: course.name,
            sections: []
          });
        }
      });
      coursesResult.forEach(course => {
        courses.forEach(courseInfo => {
          if (course.course_number === courseInfo.id) {
            const startTime = moment(course.start_time).format('h:mm A');
            const endTime = moment(course.end_time).format('h:mm A');
            courseInfo.sections.push({
              sectionId: course.sid,
              sectionName: course.section_name,
              time: `${startTime} - ${endTime}`,
              TAs: [],
              missingTAs: []
            });
          }
        });
      });

      let list = '(';
      coursesResult.forEach(section => {
        list += section.sid + ', ';
      });
      if (list.length > 2) {
        list = list.substring(0, list.length - 2);
      }
      list += ')';

      const TAQuery =
      `SELECT users.wustl_key, users.first_name, users.last_name, sections.sid
      FROM users
      JOIN participates ON
      users.uid = participates.user_id
      JOIN sections ON
      participates.section_id = sections.sid
      WHERE sections.sid IN ${list} AND users.role = 0`;
      queryDatabase(TAQuery)
      .then(TAResult => {
        TAResult.forEach(TA => {
          courses.forEach(course => {
            course.sections.forEach(section => {
              if (section.sectionId === TA.sid) {
                section.TAs.push(TA.wustl_key);
              }
            });
          });
        });
        courses.forEach(course => {
          const allTAs = new Set();
          const allMissingTAs = new Set();
          course.sections.forEach(section => {
            section.TAs.forEach(TA => {
              allTAs.add(TA);
            });
            section.missingTAs.forEach(TA => {
              allMissingTAs.add(TA);
            })
          });
          course.allTAs = Array.from(allTAs);
          course.missingTAs = Array.from(allMissingTAs);
        });
        reply(courses);
      });
    })
    .catch(err => {
      console.log(chalk.red(`Err: ${err}`));
    });
  }
};

module.exports = route;
