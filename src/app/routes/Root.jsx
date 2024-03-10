import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import NavigationBar from '../components/nav-bar/NavigationBar';
import DataProvider from '../store/DataContext';

function Root() {
  return (
    <>
      <Header />
      <NavigationBar />
      <DataProvider>
        <Outlet />
      </DataProvider>
    </>
  );
}

export default Root;
