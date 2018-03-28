import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const FieldGroup = ({id, label, validationState, ...props}) => {
  return (
    <FormGroup controlId={id} validationState={validationState()}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

export default FieldGroup;
