import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './index.css';

import getCourses from '../../api/getCourses';

import AddUserModal from '../../components/AddUserModal';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      isFetching: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    getCourses(this.props.username)
    .then(data => {
      const courses = [
        {
          name: "CSE 131",
          sections: [
            {
              sectionName: 'Section 1',
              time: '11:30 - 1:00',
            },
            {
              sectionName: 'Section 2',
              time: '1:00 - 2:30',
            },
          ]
        },
        {
          name: "CSE 222S",
          sections: [
            {
              sectionName: 'Office Hours 1',
              time: '5:30 - 7:30',
            },
          ]
        }
      ];
      this.setState({
        courses: courses,
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

  handleSubmit(userData) {
    console.log("userData = ", userData);
  }

  render() {
    const { username } = this.props;
    const { courses  } = this.state;

    // ref allows modal functions to be called (parent calls child functions)
    const modal = <AddUserModal
      ref={instance => { this.modal = instance; }}
      handleSubmit={this.handleSubmit}
    />;

    const courseList = courses.map(course => {
      const { name, sections } = course;
      const sectionList = sections.map(section => {
        const { sectionName, time } = section;
        return <li key={sectionName}>{sectionName}: {time}</li>;
      })
      return (
        <div className="block-div" key={name}>
          <p>Name: {name}</p>
          <ul>{sectionList}</ul>
        </div>
      );
    });
    return (
      <div className="center-div">
        <h1>Welcome {username}!</h1>
        <h3>Classes:</h3>
        {courseList}
        <Button bsStyle="primary" onClick={() => alert('Submit missing pressed')}>Submit Missing Form</Button><br/>
        <Button bsStyle="primary" onClick={() => alert('Add course pressed')}>Add Course</Button><br/>
        <Button bsStyle="primary" onClick={() => this.modal.handleShow()}>Add TA</Button>
        {modal}
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Profile;
