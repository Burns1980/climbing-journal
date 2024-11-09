import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '..';

import './edit-btn-icon.css';

/**
 * EditButtonIcon component renders a button with an edit icon.
 * Edit button using Font Awesome icon pen to square.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.size='fa-xl'] - The size of the icon, default is 'fa-xl' and follows Font Awesome class sizes.
 * @param {Function} props.handleClick - The function to be called when the button is clicked.
 * @param {React.ReactNode} [props.children=undefined] - Optional children elements to be rendered inside the container.
 * @returns {JSX.Element} The rendered EditButtonIcon component.
 */
const EditButtonIcon = ({
  size = 'fa-xl',
  handleClick,
  children = undefined,
}) => {
  return (
    <div className="edit-btn-icon-container">
      {children}
      <Button
        onClick={handleClick}
        className="edit-btn clear-bg"
        aria-label="Edit route"
      >
        <i className={`fa-regular fa-pen-to-square ${size}`}></i>
      </Button>
    </div>
  );
};

EditButtonIcon.propTypes = {
  handleClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  children: PropTypes.node,
};

export default EditButtonIcon;
