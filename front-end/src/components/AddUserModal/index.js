import React, { Component } from 'react';
import { Button, Radio, Modal, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import FieldGroup from './FieldGroup';

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      userData: {
        username: '',
        firstName: '',
        lastName: '',
        role: 'TA', // default value
        email: '',
        phone: ''
      }
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  handleClose() {
    this.setState({
      showModal: false,
      userData: {
        username: '',
        firstName: '',
        lastName: '',
        role: 'TA',
        email: '',
        phone: ''
      }
    });
  }

  handleShow() {
    this.setState({
      showModal: true,
    });
  }

  // Adapted from https://reactjs.org/docs/forms.html
  handleInput(type, event) {
    const userData = Object.assign({}, this.state.userData);
    userData[type] = event.target.value;
    this.setState({userData});
  }

  handleSubmit() {
    const { userData } = this.state;
    // let valid = true;
    // for (let prop in userData) {
    //   if (userData[prop] === '') {
    //     valid = false;
    //     break;
    //   }
    // }
    // if (valid) {
    //   this.props.handleSubmit(userData);
    //   this.handleClose();
    // }
    this.props.handleSubmit(userData);
    this.handleClose();
  }

  getValidationState() {
    const { userData } = this.state;
    let valid = true;
    for (let prop in userData) {
      if (userData[prop] === '') {
        valid = false;
        break;
      }
    }
    return (valid) ? 'success' : 'error';
  }

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FieldGroup
              id="formControlsUsername"
              type="text"
              label="Username"
              placeholder="Enter WUSTL key"
              onChange={e => this.handleInput('username', e)}
              validationState={this.getValidationState}
            />
            <FieldGroup
              id="formControlsFirstName"
              type="text"
              label="First Name"
              placeholder="Enter first name"
              onChange={e => this.handleInput('firstName', e)}
              validationState={this.getValidationState}
            />
            <FieldGroup
              id="formControlsLastName"
              type="text"
              label="Last Name"
              placeholder="Enter last name"
              onChange={e => this.handleInput('lastName', e)}
              validationState={this.getValidationState}
            />
            <FormGroup>
              <Radio
                name="radioRole"
                value="TA"
                onChange={e => this.handleInput('role', e)}
                defaultChecked
                inline>
                TA
              </Radio>{' '}
              <Radio
                name="radioRole"
                value="Admin"
                onChange={e => this.handleInput('role', e)}
                inline>
                Admin
              </Radio>{' '}
              <Radio
                name="radioRole"
                value="Full"
                onChange={e => this.handleInput('role', e)}
                inline>
                Full
              </Radio>
            </FormGroup>
            <FieldGroup
              id="formControlsEmail"
              type="text"
              label="Email"
              placeholder="Enter email"
              onChange={e => this.handleInput('email', e)}
              validationState={this.getValidationState}
            />
            <FieldGroup
              id="formControlsPhone"
              type="text"
              label="Phone"
              placeholder="Enter phone number"
              onChange={e => this.handleInput('phone', e)}
              validationState={this.getValidationState}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
          <Button onClick={this.handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddUserModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default AddUserModal;
