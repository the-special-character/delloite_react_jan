import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import App1 from './app1';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <>
      <App logoText="Yagnesh Modh" heading="Banner Page" />
      <App1 logoText="Virat Kohli" heading="About Page" />
    </>,
  );
}
