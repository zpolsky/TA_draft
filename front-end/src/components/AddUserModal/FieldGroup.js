import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const FieldGroup = ({id, label, validationState, ...props}) => {
  if (validationState) {
    return (
      <FormGroup controlId={id} validationState={validationState()}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
      </FormGroup>
    )
  } else {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
      </FormGroup>
    );
  }
}

export default FieldGroup;
