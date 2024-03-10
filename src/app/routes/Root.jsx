import { Outlet } from 'react-router-dom';
import DataProvider from '../store/DataContext';
import { Header, NavigationBar } from '../components';

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
