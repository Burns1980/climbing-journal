import { Outlet } from 'react-router-dom';

import { Header, NavigationBar } from '../components';
import { MenuModalProvider, DataProvider, FormProvider } from '../store';

function Root() {
  return (
    <>
      <MenuModalProvider>
        <Header />
        <NavigationBar />
        <DataProvider>
          <FormProvider>
            <main>
              <Outlet />
            </main>
          </FormProvider>
        </DataProvider>
      </MenuModalProvider>
    </>
  );
}

export default Root;
