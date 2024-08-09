// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/admin/login" />}
    />
  );
};

export default PrivateRoute;
