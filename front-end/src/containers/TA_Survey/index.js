import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';

import LinkButton from '../../components/LinkButton';
import SurveyRow from './SurveyRow';
import FieldGroup from '../../components/AddUserModal/FieldGroup';

import getAllCourses from '../../api/getAllCourses';

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
    this.setState({
      answers: {}
    });
  }

  render() {
    const options = [
      'Very Interested',
      'Some Interest',
      'No Interest'
    ];
    const rows = this.state.courses.map(course => {
      const courseSection = `${course.id}: ${course.sectionName}`;
      return (
        <SurveyRow
          key={courseSection}
          name={courseSection}
          options={options}
          onChange={e => this.handleInput(courseSection, e)}
        />
      );
    })
    // const rows = [];
    // this.state.courses.forEach(course => {
    //   course.sections.forEach(section => {
    //     const courseSection = `${course.id}: ${section.sectionName}`
    //     rows.push(
    //       <SurveyRow
    //         key={courseSection}
    //         name={courseSection}
    //         options={options}
    //         onChange={e => this.handleInput(courseSection, e)}
    //       />
    //     );
    //   })
    // });

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
