import { Outlet } from 'react-router-dom';

import { Header, NavigationBar } from '../components';
import DataProvider from '../store/DataContext';
import MenuModalProvider from '../store/MenuModalContext';

function Root() {
  return (
    <>
      <MenuModalProvider>
        <Header />
        <NavigationBar />
        <DataProvider>
          <Outlet />
        </DataProvider>
      </MenuModalProvider>
    </>
  );
}

export default Root;
