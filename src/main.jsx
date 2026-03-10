import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { loader } from './loader.js'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      loader: loader,
    },
  ],
  { basename: '/frontend-assessment' }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)