import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
  return !!Cookies.get('user');
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/404" replace />
  );
};

export default PrivateRoute;
