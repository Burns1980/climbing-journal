import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import NavigationBar from '../components/nav-bar/NavigationBar';

function Root() {
  return (
    <>
      <Header />
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default Root;
