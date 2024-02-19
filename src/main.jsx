import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root.jsx'
import ErrorPage from './error-page.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'projects',
        element: <div>Projects page nested in root</div>
      }
    ]
  },
  {
    path: 'trip-report',
    element: <div>here page not nested in root</div>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
