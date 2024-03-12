import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const MenuModalContext = createContext({
  visibleComponentId: '',
  isVisible: false,
  menuRef: undefined,
  showComponentWithId: () => {},
  setMenuRef: () => {},
  // clearMenuRef: () => {},
  hideVisibleComponent: () => {},
});

function MenuModalProvider({ children }) {
  const [ref, setRef] = useState();
  const [uiId, setUiId] = useState('');

  function showComponentWithId(_id) {
    setUiId(_id);
  }

  function setMenuRef(ref) {
    setRef(ref);
  }

  // function clearMenuRef() {
  //   setRef(null);
  // }

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
