import { useEffect, useContext } from 'react';

import { MenuModalContext } from '../store/MenuModalContext';

function useMenuToggle() {
  const ctx = useContext(MenuModalContext);

  useEffect(() => {
    const { menuRef, visibleComponentId, hideVisibleComponent } = ctx;
    console.log('inside useEffect in UseMenuToggle');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        hideVisibleComponent();
        // console.log('escape key pressed', ctx);
      }
      // Menu should close when enter is pressed on a different element
      if (
        e.key === 'Enter' &&
        menuRef &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        hideVisibleComponent();
      }
    };

    const handleClickOutside = (e) => {
      if (menuRef && menuRef.current && !menuRef.current.contains(e.target)) {
        // console.log('handle click outside', ctx);
        hideVisibleComponent();
      }
    };

    /*  
      No need to listen when when there is not a menu open. Menus open
      when an id is set in the MenuModalContext
    */
    if (visibleComponentId) {
      console.log('creating listeners');

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      console.log('removing listeners');

      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ctx.visibleComponentId]);
}

export default useMenuToggle;
