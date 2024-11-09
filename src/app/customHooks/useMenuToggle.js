import { useEffect, useContext } from 'react';

import { MenuModalContext } from '../store';

function useMenuToggle() {
  const ctx = useContext(MenuModalContext);
  const { menuRef, visibleComponentId, hideVisibleComponent } = ctx;

  useEffect(() => {
    // no need to attache listeners since no component is visible
    if (!visibleComponentId) {
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        hideVisibleComponent();
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
        hideVisibleComponent();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visibleComponentId, menuRef, hideVisibleComponent]);
}

export default useMenuToggle;
