import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Button to navigate between pages within the application
const LinkButton = ({to, btnText, bsStyle, onClick}) => {
  const style = (bsStyle) ? bsStyle : "primary";
  return (
    <Link to={to}>
      <Button bsStyle={style} onClick={onClick}>{btnText}</Button>
    </Link>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  bsStyle: PropTypes.string,
  onClick: PropTypes.func
};

export default LinkButton;
