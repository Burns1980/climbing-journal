import './ellipsisMenu.css';

function VerticalEllipsisMenu() {
  return (
    <div className="vertical-ellipsis-menu">
      <svg
        width="20px"
        height="20px"
        className="ellipsis-icon"
        fill="currentColor"
        viewBox="0 0 10 10"
      >
        <circle cx="5" cy="2" r="1" />
        <circle cx="5" cy="5" r="1" />
        <circle cx="5" cy="8" r="1" />
      </svg>
      <ul className="menu-list text-sm">
        <li className="menu-item">Edit</li>
        <li className="menu-item">Hide</li>
        <li className="menu-item">Favorite</li>
      </ul>
    </div>
  );
}

export default VerticalEllipsisMenu;
