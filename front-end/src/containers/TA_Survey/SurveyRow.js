import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from './RadioGroup';

const SurveyRow = ({name, currentValue, options, onChange, ...props}) => {
  const radioButtons = options.map(option => {
    return (
      <td key={name + option}>
        <RadioGroup
          name={name}
          currentValue={currentValue}
          value={option}
          onChange={onChange}
        />
      </td>
    );
  });

  return (
    <tr>
      <td>{name}</td>
      {radioButtons}
    </tr>
  );
}

SurveyRow.propTypes = {
  name: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SurveyRow;
