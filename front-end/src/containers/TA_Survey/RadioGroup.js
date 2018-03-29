import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio } from 'react-bootstrap';

const RadioGroup = ({name, value, onChange, ...props}) => {
  return (
    <Radio
      name={"radio" + name}
      value={value}
      onChange={onChange}
      defaultChecked={value === "No Interest"}>
    </Radio>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RadioGroup;
