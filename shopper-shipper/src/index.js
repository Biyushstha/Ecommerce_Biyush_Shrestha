import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/routes';
import { CartProvider } from './context/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </React.StrictMode>
);
