import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  Root,
  Home,
  // EditPage,
  RouteForm,
  Routes,
  RouteDetail,
  ErrorPage,
  RouteFormAction,
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
      shouldRevalidate: () => false,
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
              element: <RouteForm isEditMode={false} />,
              action: RouteFormAction,
            },
            {
              path: 'edit-route/:routeId',
              element: <RouteForm isEditMode={true} />,
              action: RouteFormAction,
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
