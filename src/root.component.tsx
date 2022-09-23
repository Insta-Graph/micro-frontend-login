import '@fontsource/roboto';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material';
import {
  AuthLayout,
  ThemeProvider,
  createCustomTheme,
  AuthProvider,
} from '@snapify/shared-modules';

import AuthLogin from './components/AuthLogin';
import CardFooter from './components/CardFooter';

const accessToken = '';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: { authorization: accessToken ? `Bearer ${accessToken}` : '' },
});

const Root: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <MaterialThemeProvider theme={createCustomTheme()}>
        <ThemeProvider>
          <AuthProvider protectedRoute>
            <AuthLayout cardFooter={<CardFooter />}>
              <AuthLogin />
            </AuthLayout>
          </AuthProvider>
        </ThemeProvider>
      </MaterialThemeProvider>
    </ApolloProvider>
  );
};

export default Root;
