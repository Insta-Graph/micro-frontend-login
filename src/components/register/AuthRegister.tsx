import type { SxProps, Theme } from '@mui/material';
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
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { navigate } from '@reach/router';
import {
  GoogleLogo,
  PasswordField,
  useRegisterMutation,
  authService,
} from '@snapify/shared-modules';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AuthRegister: React.FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [registerUser, result] = useRegisterMutation();

  const googleHandler = async (): Promise<void> => {
    // eslint-disable-next-line no-console
    console.error('Register');
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            onClick={googleHandler}
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
            Sign up with Google
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
                fontWeight: 500,
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
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          agreeWithTerms: false,
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
          firstName: Yup.string().max(30).required('First name is required'),
          lastName: Yup.string().max(30).required('Last name is required'),
          agreeWithTerms: Yup.bool().oneOf([true], 'You have to agree with terms and conditions'),
        })}
        onSubmit={async (values): Promise<void> => {
          const response = await registerUser({
            variables: {
              input: { ...values },
            },
          });
          if (response.data?.registerUser.__typename === 'AuthData') {
            authService.setAccessToken(response.data.registerUser.auth.accessToken);
            authService.setAccessTokenExpiration(response.data.registerUser.auth.expiresIn);
            navigate('/');
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  margin="normal"
                  name="firstName"
                  value={values.firstName}
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={theme.typography.customInput as SxProps<Theme>}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  name="lastName"
                  value={values.lastName}
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={theme.typography.customInput as SxProps<Theme>}
                />
              </Grid>
            </Grid>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={theme.typography.customInput as SxProps<Theme>}
            >
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
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

            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                {touched.agreeWithTerms && errors.agreeWithTerms && (
                  <FormHelperText error id="standard-weight-helper-text-agreeWithTerms-register">
                    {errors.agreeWithTerms}
                  </FormHelperText>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.agreeWithTerms}
                      onChange={handleChange}
                      name="agreeWithTerms"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component="a">
                        Terms & Conditions.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {result.error && (
              <Box>
                <FormHelperText error>{result.error && result.error.message}</FormHelperText>
              </Box>
            )}
            {result.data?.registerUser.__typename === 'ResponseStatus' && (
              <Box>
                <FormHelperText error>{result.data.registerUser.message}</FormHelperText>
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
                Sign up
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
