import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home';
import Mint from './routes/mint';
import { AuthProvider } from './contexts/authContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/mint',
    element: <Mint />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <div className="h-[100vh]">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </React.StrictMode>,
);
