import React from 'react';

import type { RouteComponentProps } from '@reach/router';
import { AuthLayout, AuthProvider } from '@snapify/shared-modules';

import AuthForgotPassword from './AuthForgotPassword';
import CardHeader from './CardHeader';

const Login: React.FC<RouteComponentProps> = () => {
  return (
    <AuthProvider protectedRoute>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <AuthLayout cardFooter={<></>} cardHeader={<CardHeader />}>
        <AuthForgotPassword />
      </AuthLayout>
    </AuthProvider>
  );
};

export default Login;
