import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';

function Sidebar({ className, handleAddClick }) {
  return (
    <aside className={className + ' text-sm'}>
      <h2>Sidebar here</h2>
      <Button onClick={handleAddClick}>Add Route</Button>
      <div>
        <h3>Top 3 favorite routes</h3>
        <p>First Favorite</p>
        <p>Second Favorite</p>
        <p>Third Favorite</p>
      </div>
      <div>
        <h3>Top 3 favorite trips</h3>
        <p>First Favorite</p>
        <p>Second Favorite</p>
        <p>Third Favorite</p>
      </div>
      <div>
        <h3>Current trip research</h3>
        <p>Trip research Patagonia</p>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
