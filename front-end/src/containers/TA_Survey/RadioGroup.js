import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Radio } from 'react-bootstrap';

const RadioGroup = ({name, currentValue, value, onChange, ...props}) => {
  return (
    <Radio
      name={"radio" + name}
      value={value}
      onChange={onChange}
      defaultChecked={currentValue === value}>
    </Radio>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RadioGroup;
