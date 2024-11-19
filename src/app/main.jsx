import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  Root,
  Home,
  EditPage,
  AddNewRoute,
  Routes,
  RouteDetail,
  ErrorPage,
  addNewRouteAction,
} from './pages';
import { fetchRoutes } from './utils';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: () => fetchRoutes('GET'),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'routes-climbed',
          children: [
            {
              index: true,
              element: <Routes />,
            },
            {
              path: ':routeId',
              element: <RouteDetail />,
            },
            {
              path: 'add-new-route',
              element: <AddNewRoute />,
              action: addNewRouteAction,
            },
            {
              path: 'edit-route/:routeId',
              element: <EditPage />,
            },
          ],
        },
        {
          path: 'trip-research',
          element: <div>Trip research</div>,
        },
        {
          path: 'trip-report',
          element: <div>Trip report</div>,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_fetcherPersistent: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
