import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/Root.jsx';
import Home from './containers/home-page/Home.jsx';
import Routes from './containers/routes-page/Routes.jsx';
import ErrorPage from './error-page.jsx';
import { fetchRoutes } from './utils/http-requests.js';

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
        path: 'routes-by-me',
        element: <Routes />,
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
