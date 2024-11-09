import React from 'react';
import { Outlet } from 'react-router-dom';
import { RouteFormProvider } from '../../store';

function RouteRoot() {
  return (
    <RouteFormProvider>
      <Outlet />
    </RouteFormProvider>
  );
}

export default RouteRoot;
