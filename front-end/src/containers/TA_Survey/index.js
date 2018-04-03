import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Table } from 'react-bootstrap';

import LinkButton from '../../components/LinkButton';
import SurveyRow from './SurveyRow';
import FieldGroup from '../../components/AddUserModal/FieldGroup';

import getAllCourses from '../../api/getAllCourses';
import submitSurvey from '../../api/submitSurvey';

import './index.css';

class TA_Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      courses: [],
      isFetching: true
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    getAllCourses()
    .then(data => {
      this.setState({
        courses: data,
        isFetching: false
      });
    })
    .catch(error => {
      this.setState({
        courses: [],
        isFetching: false
      });
    })
  }

  // Adapted from https://reactjs.org/docs/forms.html
  handleInput(course, event) {
    const answers = Object.assign({}, this.state.answers);
    answers[course] = event.target.value;
    this.setState({answers});
  }

  handleSubmit() {
    this.state.courses.forEach(course => {
      const courseSection = `${course.id}: ${course.sectionName}`;
      const courseSectionTime = `${course.id}: ${course.startTime} - ${course.endTime}`;
      if (!this.state.answers[courseSection] && !this.state.answers[courseSectionTime]) {
        this.state.answers[courseSection] = 'No Interest';
      }
    });
    const answers = Object.assign({}, this.state.answers);
    submitSurvey(answers);
    this.setState({
      answers: {}
    });
  }

  render() {
    const options = [
      'Very Interested and have TA\'d before',
      'Very Interested and have not TA\'d before',
      'Some Interest and have TA\'d before',
      'Some Interest and have not TA\'d before',
      'No Interest'
    ];
    const mulipleSectionCourses = ['CSE 131', 'CSE 132', 'CSE 247'];
    const concurrentSectionTimes = [];
    const singleSectionCourses = [];
    const rows = [];

    // Courses appearing in the mulipleSectionCourses array will have multiple rows in the table,
    //  with a label corresponding to the course name (id) and the section time. Courses with concurrent
    //  sections should also appear only once (ex: 131 has sections A, B, and C all at 11:30 to 1:00, should
    //  only appear once)
    // Otherwise, course should be listed once and not appear multiple times, regardless of number of sections
    this.state.courses.forEach(course => {
      if (mulipleSectionCourses.includes(course.id) && !concurrentSectionTimes.includes(course.startTime)) {
        const courseSection = `${course.id}: ${course.startTime} - ${course.endTime}`;
        rows.push(
          <SurveyRow
            key={courseSection}
            name={courseSection}
            options={options}
            onChange={e => this.handleInput(courseSection, e)}
          />
        );
        concurrentSectionTimes.push(course.startTime);
      } else if (!singleSectionCourses.includes(course.id) && !mulipleSectionCourses.includes(course.id)) {
        rows.push(
          <SurveyRow
            key={course.id}
            name={course.id}
            options={options}
            onChange={e => this.handleInput(course.id, e)}
          />
        );
        singleSectionCourses.push(course.id);
      }
    })

    const optionHeaders = options.map(option => {
      return <th key={option}>{option}</th>;
    });

    return (
      <div>
        <form className="form-body">
          <Table responsive className="survey-table">
            <thead>
              <tr>
                <th>Course</th>
                {optionHeaders}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </form>
        <br/>
        <LinkButton to="/profile" btnText="Submit" bsStyle="primary" onClick={this.handleSubmit} />
      </div>
    );
  }
}

TA_Survey.propTypes = {
  username: PropTypes.string.isRequired,
};

export default TA_Survey;
