import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Table, FormGroup, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import LinkButton from '../../components/LinkButton';

import getCourses from '../../api/getCourses';
import getDraftStudents from '../../api/getDraftStudents';
import submitDraft from '../../api/submitDraft';

import './index.css';

class TA_Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      students: [],
      isFetching: true
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getDraftStudents(this.props.username)
    .then(studentData => {
      this.setState({
        students: studentData
      })
    })
    .catch(error => {
      this.setState({
        students: [],
        isFetching: false
      });
    })
  }

  // Adapted from https://reactjs.org/docs/forms.html
  handleInput(event, id) {
    const answers = Object.assign({}, this.state.answers);
    answers[id] = event.target.checked
    this.setState({answers});
  }

  handleSubmit() {
    const answers = Object.assign({}, this.state.answers);
    //submitDraft(answers);
    this.setState({
      answers: {}
    });
  }

  render() {
    if (!this.props.username) {
      return <Redirect to="/"/>;
    }

    const courses = [];
    const sectionIds = [];
    this.state.students.forEach(student => {
      const course = {
        cid: student.cid,
        sid: student.sid,
        courseNumber: student.courseNumber,
        sectionName: student.sectionName,
        time: student.time,
        students: []
      };
      if (!sectionIds.includes(course.sid)) {
        courses.push(course);
        sectionIds.push(course.sid);
      }
    });

    courses.forEach(course => {
      this.state.students.forEach(student => {
        if (course.sid === student.sid) {
          course.students.push(student);
        }
      });
    });

    const tables = courses.map(course => {
      const rows = course.students.map(student => {
        const id = `checkBox${course.cid}:${course.sid}:${student.wustl_key}`;
        return <tr key={id}>
          <td>{`${student.first_name} ${student.last_name}`}</td>
          <td>{student.interest}</td>
          <td>
            <input
              type="checkbox"
              checked={(this.state.answers[id]) ? this.state.answers[id] : false}
              onChange={e => this.handleInput(e, id)}
            />
          </td>
        </tr>
      });
      return (
        <React.Fragment key={`${course.cid}${course.sid}`}>
          <form className="form-body">
            <span>{`${course.courseNumber} ${course.sectionName}`}</span>
            <Table responsive className="survey-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Interest</th>
                  <th>Drafted</th>
                </tr>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </Table>
          </form>
          <br/>
        </React.Fragment>
      );
    });

    return (
      <div>
        {tables}
        <LinkButton to="/profile" btnText="Submit" bsStyle="primary" onClick={this.handleSubmit} />
      </div>
    );
  }
}

TA_Draft.propTypes = {
  username: PropTypes.string.isRequired,
};

export default TA_Draft;
