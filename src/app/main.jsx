import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  Home,
  Root,
  RouteRoot,
  Routes,
  AddNewRoute,
  RouteInfo,
  ErrorPage,
  addNewRouteAction,
} from './pages';
import { fetchRoutes } from './utils';

import './index.css';

const router = createBrowserRouter([
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
        element: <RouteRoot />,
        children: [
          {
            index: true,
            element: <Routes />,
          },
          {
            path: ':route-id',
            element: <RouteInfo />,
          },
          {
            path: 'add-new-route',
            element: <AddNewRoute />,
            action: addNewRouteAction,
          },
          {
            path: 'edit-route/:id',
            element: <div>Hello</div>,
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
