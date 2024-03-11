/* eslint-disable react/prop-types */
import { Button } from '../index';

import './ellipsisMenu.css';

function VerticalEllipsisMenu({ handleClick, showEllipsisMenu }) {
  return (
    <div className="vertical-ellipsis-menu">
      <Button
        className="btn-transparent"
        onClick={handleClick}
        aria-label="Open Menu"
      >
        <svg
          width="25px"
          height="30px"
          className="ellipsis-icon"
          fill="currentColor"
          viewBox="0 0 10 10"
        >
          <circle cx="5" cy="2" r="1" />
          <circle cx="5" cy="6" r="1" />
          <circle cx="5" cy="10" r="1" />
        </svg>
      </Button>
      <div>
        <ul
          className={`menu-list text-sm ${
            showEllipsisMenu ? 'menu-visible' : ''
          }`}
        >
          <li className="menu-item">
            <Button
              className="menu-btn"
              onClick={handleClick}
              aria-label="Open Menu"
            >
              Edit
            </Button>
          </li>
          <li className="menu-item">
            <Button className="menu-btn" onClick={handleClick}>
              Hide
            </Button>
          </li>
          <li className="menu-item">
            <Button className="menu-btn" onClick={handleClick}>
              Favorite
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default VerticalEllipsisMenu;
