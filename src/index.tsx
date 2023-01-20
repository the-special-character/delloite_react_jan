import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './style.css';
import { AuthProvider } from './context/authContext';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>,
  );
}
