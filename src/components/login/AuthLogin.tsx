import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { navigate, Link } from '@reach/router';
import { GoogleLogo, PasswordField, useLoginMutation, authService } from '@snapify/shared-modules';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AuthRegister: React.VFC = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const [storedEmail, setStoredEmail] = useState('');
  const [login, result] = useLoginMutation();

  useEffect(() => {
    if (typeof window !== undefined) {
      const email = window.localStorage.getItem('email');
      if (email) {
        setStoredEmail(email);
      }
    }
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            sx={{
              color: 'grey.700',
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[100],
            }}
          >
            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
              <GoogleLogo />
            </Box>
            Sign in with Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 600,
                borderRadius: `12px`,
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        enableReinitialize
        initialValues={{
          email: storedEmail,
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string()
            .min(8)
            .max(255)
            .matches(/[0-9]/, 'Must have at least one digit')
            .matches(/[a-z]/, 'Must have at least one lowercase letter')
            .matches(/[A-Z]/, 'Must have at least one uppercase letter')
            .matches(
              /[!#@$%^&*)(+=._-]/,
              'Must have at least one special character: !#@$%^&*)(+=._-'
            )
            .required('Password is required'),
        })}
        onSubmit={async (values): Promise<void> => {
          const response = await login({
            variables: {
              input: { ...values },
            },
          });
          if (response.data?.login.__typename === 'AuthData') {
            authService.setAccessToken(response.data.login.auth.accessToken);
            authService.setAccessTokenExpiration(response.data.login.auth.expiresIn);
            navigate('/profile');
          }
          if (checked) {
            window.localStorage.setItem('email', values.email);
          } else {
            window.localStorage.removeItem('email');
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => (
          <form onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={theme.typography.customInput as SxProps<Theme>}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <PasswordField
              fieldName="password"
              label="Password"
              currentValue={values.password}
              passwordError={errors.password}
              passwordTouched={touched.password}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event): void => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link to="/auth/forgot-password" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  sx={{ textDecoration: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Stack>
            {result.error && (
              <Box>
                <FormHelperText error>{result.error && result.error.message}</FormHelperText>
              </Box>
            )}
            {result.data?.login.__typename === 'ResponseStatus' && (
              <Box>
                <FormHelperText error>{result.data.login.message}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                disabled={result.loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Sign in
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
