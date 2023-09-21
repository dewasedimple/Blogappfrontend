// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const Protect = ({ element: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/" />}
    />
  );
};

export default Protect;
