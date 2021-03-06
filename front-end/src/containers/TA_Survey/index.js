import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import LinkButton from '../../components/LinkButton';
import SurveyRow from './SurveyRow';
import FieldGroup from '../../components/AddUserModal/FieldGroup';

import getAllCourses from '../../api/getAllCourses';
import submitSurvey from '../../api/submitSurvey';
import getSurveyAnswers from '../../api/getSurveyAnswers';

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

  // componentWillMount() {
  //   getAllCourses()
  //   .then(data => {
  //     this.setState({
  //       courses: data,
  //     });
  //     if (this.props.user.surveyCompleted) {
  //       getSurveyAnswers(this.props.user.uid)
  //       .then(origAnswers => {
  //         origAnswers.forEach(answer => {
  //           const courseSection = `${answer.course_number}`;
  //           const answers = Object.assign({}, this.state.answers);
  //           answers[courseSection] = {
  //             course_id: answer.cid,
  //             section_id: answer.sid,
  //             preference: answer.interest,
  //           };
  //           this.setState({answers});
  //         });
  //         this.setState({
  //           isFetching: false
  //         });
  //       })
  //       .catch(error => {
  //         this.setState({
  //           courses: [],
  //           isFetching: false
  //         })
  //       })
  //     } else {
  //       this.setState({
  //         isFetching: false
  //       });
  //     }
  //   })
  //   .catch(error => {
  //     this.setState({
  //       courses: [],
  //       isFetching: false
  //     });
  //   })
  // }
  // Adapted from https://reactjs.org/docs/forms.html
  handleInput(event, courseSection, course) {
    const answers = Object.assign({}, this.state.answers);
    answers[courseSection] = {
      course_id: course.cid,
      section_id: course.sid,
      preference: event.target.value,
    };
    this.setState({answers});
  }

  handleSubmit() {
    const answers = Object.assign({}, this.state.answers);
    submitSurvey(answers, this.props.user.username);
    this.setState({
      answers: {}
    });
  }

  render() {
    if (!this.props.user.username) {
      return <Redirect to="/" />
    }
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
      const answerId = `${course.id}`;
      const currentValue = (this.state.answers[answerId]) ? this.state.answers[answerId].preference : 'No Interest';
      if (mulipleSectionCourses.includes(course.id) && !concurrentSectionTimes.includes(course.startTime)) {
        const courseSection = `${course.id}: ${course.startTime} - ${course.endTime}`;
        rows.push(
          <SurveyRow
            key={courseSection}
            currentValue={currentValue}
            name={courseSection}
            options={options}
            onChange={e => this.handleInput(e, courseSection, course)}
          />
        );
        concurrentSectionTimes.push(course.startTime);
      } else if (!singleSectionCourses.includes(course.id) && !mulipleSectionCourses.includes(course.id)) {
        rows.push(
          <SurveyRow
            key={course.id}
            currentValue={currentValue}
            name={course.id}
            options={options}
            onChange={e => this.handleInput(e, course.id, course)}
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
  user: PropTypes.shape({
    username: PropTypes.string,
    uid: PropTypes.number,
    isActive: PropTypes.bool,
    surveyCompleted: PropTypes.bool,
    role: PropTypes.number
  }).isRequired,
};

export default TA_Survey;
