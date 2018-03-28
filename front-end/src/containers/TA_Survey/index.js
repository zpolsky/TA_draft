import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio, FormGroup } from 'react-bootstrap';

import LinkButton from '../../components/LinkButton';
import FieldGroup from '../../components/AddUserModal/FieldGroup';

import './index.css';

class TA_Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test',
      answers: {
        a: '',
        b: '',
        c: '',
        xyz: 'x' // default value
      }
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }

  // Adapted from https://reactjs.org/docs/forms.html
  handleInput(type, event) {
    const answers = Object.assign({}, this.state.answers);
    answers[type] = event.target.value;
    this.setState({answers});
  }

  handleSubmit() {
    this.setState({
      test: 'completed',
      answers: {
        a: '',
        b: '',
        c: '',
        xyz: ''
      }
    });
  }

  getValidationState() {
    const { answers } = this.state;
    let valid = true;
    for (let prop in answers) {
      if (answers[prop] === '') {
        valid = false;
        break;
      }
    }
    return (valid) ? 'success' : 'error';
  }

  render() {
    return (
      <div>
        <form className="form-body">
          <FieldGroup
            id="formControlsA"
            type="text"
            label="A"
            placeholder="Enter A"
            onChange={e => this.handleInput('a', e)}
            validationState={this.getValidationState}
          />
          <FieldGroup
            id="formControlsB"
            type="text"
            label="B"
            placeholder="Enter B"
            onChange={e => this.handleInput('b', e)}
            validationState={this.getValidationState}
          />
          <FieldGroup
            id="formControlsC"
            type="text"
            label="C"
            placeholder="Enter C"
            onChange={e => this.handleInput('c', e)}
            validationState={this.getValidationState}
          />
          <FormGroup>
            <Radio
              name="radioXYZ"
              value="x"
              onChange={e => this.handleInput('xyz', e)}
              defaultChecked
              inline>
              X
            </Radio>{' '}
            <Radio
              name="radioXYZ"
              value="y"
              onChange={e => this.handleInput('xyz', e)}
              inline>
              Y
            </Radio>{' '}
            <Radio
              name="radioXYZ"
              value="z"
              onChange={e => this.handleInput('xyz', e)}
              inline>
              Z
            </Radio>
          </FormGroup>
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
