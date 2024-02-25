import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header/Header';
import NavigationBar from '../components/nav-bar/NavigationBar';

function Root() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  return (
    <>
      <Header
        setIsMobileMenuActive={setIsMobileMenuActive}
        isMobileMenuActive={isMobileMenuActive}
      />
      <NavigationBar isMobileMenuActive={isMobileMenuActive} />
      <Outlet />
    </>
  );
}

export default Root;
