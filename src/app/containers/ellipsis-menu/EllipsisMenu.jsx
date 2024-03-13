import { useRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { EllipsisButton, Button } from '../../components';
import { MenuModalContext } from '../../store/MenuModalContext';

import './ellipsisMenu.css';

function VerticalEllipsisMenu({ handleMenuAction, menuActionNames, _id }) {
  const menuCtx = useContext(MenuModalContext);
  const {
    showComponentWithId,
    hideVisibleComponent,
    setMenuRef,
    visibleComponentId,
  } = menuCtx;
  const menuRef = useRef();

  const handleItemClick = (action) => () => handleMenuClick(action);

  const handleEllipsisBtnClick = () => {
    // clear the id so the menu closes
    if (visibleComponentId === _id) {
      return hideVisibleComponent();
    }

    showComponentWithId(_id);
    setMenuRef(menuRef);
  };

  function handleMenuClick(menuAction) {
    if (menuAction === 'edit') {
      hideVisibleComponent();
    }
    handleMenuAction(menuAction);
  }

  return (
    <div ref={menuRef} className="vertical-ellipsis-menu">
      <EllipsisButton handleClick={handleEllipsisBtnClick} />
      <div>
        <ul
          className={`menu-list text-sm ${
            visibleComponentId === _id ? 'menu-visible' : ''
          }`}
        >
          {menuActionNames.map((action) => (
            <li key={action} className="menu-item">
              <Button
                className="menu-btn"
                onClick={handleItemClick(action)}
                aria-label={`Action ${action}`}
              >
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

VerticalEllipsisMenu.propTypes = {
  handleMenuAction: PropTypes.func.isRequired,
  menuActionNames: PropTypes.array.isRequired,
};

export default VerticalEllipsisMenu;
