/* eslint-disable react/prop-types */
import './ellipsisMenu.css';

function VerticalEllipsisMenu({ handleClick, showEllipsisMenu, handleBlur }) {
  function handleClickInMenu(e) {
    console.dir('inside list');
    e.stopPropagation();
  }

  return (
    <div
      onBlur={handleBlur}
      // onFocus={(e) => {
      //   console.dir(e.currentTarget);
      //   console.dir(e.target);
      //   console.dir('onfocus');
      // }}
      className="vertical-ellipsis-menu"
    >
      <button
        className="btn-transparent"
        onClick={handleClick}
        aria-label="Open Menu"
        // onBlur={handleBlur}
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
      </button>
      <div>
        <ul
          className={`menu-list text-sm ${
            showEllipsisMenu ? 'menu-visible' : ''
          }`}
        >
          <button
            // className="btn-transparent"
            onClick={handleClickInMenu}
            // onClick={handleClick}
            aria-label="Open Menu"
          >
            <li className="menu-item">Edit</li>
          </button>
          <li className="menu-item">Hide</li>
          <li className="menu-item">Favorite</li>
        </ul>
      </div>
    </div>
  );
}

export default VerticalEllipsisMenu;
