import { useRef } from 'react';
import PropTypes from 'prop-types';
import { EllipsisButton, Button } from '../../components';

import useMenuToggle from '../../customHooks/useMenuToggle';

import './ellipsisMenu.css';

function VerticalEllipsisMenu({ handleMenuAction, menuActionNames }) {
  const menuRef = useRef();
  const [isVisible, setIsVisible] = useMenuToggle(menuRef);
  const handleItemClick = (action) => () => handleMenuClick(action);
  const toggleVisibility = () => setIsVisible((isVisbile) => !isVisbile);

  function handleMenuClick(menuAction) {
    if (menuAction === 'edit') {
      toggleVisibility();
    }
    handleMenuAction(menuAction);
  }

  return (
    <div ref={menuRef} className="vertical-ellipsis-menu">
      <EllipsisButton handleClick={toggleVisibility} />
      <div>
        <ul className={`menu-list text-sm ${isVisible ? 'menu-visible' : ''}`}>
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
