import React, { Suspense } from 'react';

import { ThemeProvider as MaterialThemeProvider } from '@mui/material';
import { Router, Redirect } from '@reach/router';
import { ThemeProvider, createCustomTheme, ApolloProvider, Loader } from '@snapify/shared-modules';

const Login = React.lazy(() => import('./components/login'));
const Register = React.lazy(() => import('./components/register'));

const Root: React.FC = () => {
  return (
    <ApolloProvider>
      <MaterialThemeProvider theme={createCustomTheme()}>
        <ThemeProvider>
          <Suspense fallback={<Loader />}>
            <Router basepath="/auth">
              <Redirect from="/" to="/auth/sign-in" />
              <Register path="/sign-up" />
              <Login default />
            </Router>
          </Suspense>
        </ThemeProvider>
      </MaterialThemeProvider>
    </ApolloProvider>
  );
};

export default Root;
