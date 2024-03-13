import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const MenuModalContext = createContext({
  visibleComponentId: '',
  menuRef: undefined,
  showComponentWithId: () => {},
  setMenuRef: () => {},
  hideVisibleComponent: () => {},
});

function MenuModalProvider({ children }) {
  const [ref, setRef] = useState();
  const [uiId, setUiId] = useState('');

  function showComponentWithId(id) {
    setUiId(id);
  }

  function setMenuRef(ref) {
    setRef(ref);
  }

  function hideVisibleComponent() {
    setUiId('');
    setRef(null);
  }

  const menuModalCtx = {
    visibleComponentId: uiId,
    menuRef: ref,
    showComponentWithId,
    setMenuRef,
    hideVisibleComponent,
  };

  return (
    <MenuModalContext.Provider value={menuModalCtx}>
      {children}
    </MenuModalContext.Provider>
  );
}

MenuModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuModalProvider;
