import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home';
import { AuthProvider } from './contexts/authContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
