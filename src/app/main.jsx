import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  Root,
  Home,
  RouteForm,
  Routes,
  RouteDetail,
  ErrorPage,
  RouteFormAction,
} from './pages';
import { fetchRoutes } from './utils';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    hydrateFallbackElement: <Home />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: () => fetchRoutes('GET'),
    // We don't want to revalidate if there are form validation errors
    shouldRevalidate: (action) => {
      return !action.actionResult;
    },
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
