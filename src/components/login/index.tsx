import React from 'react';

import type { RouteComponentProps } from '@reach/router';
import { AuthLayout, AuthProvider } from '@snapify/shared-modules';

import AuthLogin from './AuthLogin';
import CardFooter from './CardFooter';

const Login: React.FC<RouteComponentProps> = () => {
  return (
    <AuthProvider protectedRoute>
      <AuthLayout cardFooter={<CardFooter />}>
        <AuthLogin />
      </AuthLayout>
    </AuthProvider>
  );
};

export default Login;
