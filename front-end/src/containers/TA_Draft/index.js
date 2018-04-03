import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Table, FormGroup, FormControl } from 'react-bootstrap';

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
      courses: [],
      students: [],
      isFetching: true
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    getCourses(this.props.username)
    .then(courseData => {
      this.setState({
        courses: courseData,
        isFetching: false
      });
    })
    .catch(error => {
      this.setState({
        courses: [],
        students: [],
        isFetching: false
      });
    })
  }

  // componentWillMount() {
  //   Promise.all([getCourses(this.props.username), getDraftStudents()])
  //   .then(courseData => {
  //     this.setState({
  //       courses: courseData,
  //       isFetching: false
  //     });
  //   })
  //   .then(studentData => {
  //     this.setState({
  //       students: studentData
  //     })
  //   })
  //   .catch(error => {
  //     this.setState({
  //       courses: [],
  //       students: [],
  //       isFetching: false
  //     });
  //   })
  // }

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
    const students = ['Billy', 'Fred', 'Tonya'];

    const tables = this.state.courses.map(course => {
      const rows = students.map(student => {
        const id = `checkBox${course.id}${student}`;
        return <tr key={student}>
          <td>{student}</td>
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
        <React.Fragment key={course}>
          <form className="form-body">
            <span>{course.id}</span>
            <Table responsive className="survey-table">
              <thead>
                <tr>
                  <th>Student</th>
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
