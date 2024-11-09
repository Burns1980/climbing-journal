import { Outlet } from 'react-router-dom';

import { Header, NavigationBar } from '../components';
import { MenuModalProvider, DataProvider } from '../store';

function Root() {
  return (
    <>
      <MenuModalProvider>
        <Header />
        <NavigationBar />
        <DataProvider>
          <main>
            <Outlet />
          </main>
        </DataProvider>
      </MenuModalProvider>
    </>
  );
}

export default Root;
