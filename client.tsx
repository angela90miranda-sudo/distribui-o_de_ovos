import React from 'react';
import ReactDOM from 'react-dom/client';
import ClientPage from './ClientPage';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ClientPage />
  </React.StrictMode>
);