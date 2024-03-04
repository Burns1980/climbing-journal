import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import NavigationBar from '../components/nav-bar/NavigationBar';
import RoutesProvider from '../store/RoutesContext';

function Root() {
  return (
    <RoutesProvider>
      <Header />
      <NavigationBar />
      <Outlet />
    </RoutesProvider>
  );
}

export default Root;
