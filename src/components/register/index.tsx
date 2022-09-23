import React from 'react';

import type { RouteComponentProps } from '@reach/router';
import { AuthLayout, AuthProvider } from '@snapify/shared-modules';

import AuthRegister from './AuthRegister';
import CardFooter from './CardFooter';

const Register: React.FC<RouteComponentProps> = () => {
  return (
    <AuthProvider protectedRoute>
      <AuthLayout cardFooter={<CardFooter />}>
        <AuthRegister />
      </AuthLayout>
    </AuthProvider>
  );
};

export default Register;
