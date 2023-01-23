import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './context/authContext';
import { Provider } from 'react-redux';
import './style.css';
import configureStore from './cofigureStore';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  const store = configureStore();

  root.render(
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>,
  );
}
