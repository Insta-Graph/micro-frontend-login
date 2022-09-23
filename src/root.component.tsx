import '@fontsource/roboto';

import React, { Suspense } from 'react';

import { ThemeProvider as MaterialThemeProvider } from '@mui/material';
import { Router } from '@reach/router';
import {
  ThemeProvider,
  createCustomTheme,
  ApolloProvider,
  apolloClient,
  Loader,
} from '@snapify/shared-modules';

const Login = React.lazy(() => import('./components/login'));
const Register = React.lazy(() => import('./components/register'));

const Root: React.FC = () => {
  return (
    <Router basepath="/auth">
      <ApolloProvider client={apolloClient}>
        <MaterialThemeProvider theme={createCustomTheme()}>
          <ThemeProvider>
            <Suspense fallback={<Loader />}>
              <Login path="/sign-in" />
              <Register path="/sign-up" />
            </Suspense>
          </ThemeProvider>
        </MaterialThemeProvider>
      </ApolloProvider>
    </Router>
  );
};

export default Root;
