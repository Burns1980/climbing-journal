import React from 'react';
import PropTypes from 'prop-types';

import { EditButtonIcon } from '..';

import './editable-section.css';

const EditableSection = ({ title, content, handleEditClick }) => (
  <section className="editable-container">
    <EditButtonIcon handleClick={handleEditClick}>
      <h3 className="text-xl">{title}</h3>
    </EditButtonIcon>
    <p className="text-sm p-margin-editable">{content}</p>
  </section>
);

EditableSection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default EditableSection;
