import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { navigate, useParams } from '@reach/router';
import { PasswordField, useResetPasswordMutation } from '@snapify/shared-modules';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AuthResetPassword: React.VFC = () => {
  const theme = useTheme();
  const [resetPassword, result] = useResetPasswordMutation();
  const { token } = useParams<{ token: string }>();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        newPassword: Yup.string()
          .min(8)
          .max(255)
          .matches(/[0-9]/, 'Must have at least one digit')
          .matches(/[a-z]/, 'Must have at least one lowercase letter')
          .matches(/[A-Z]/, 'Must have at least one uppercase letter')
          .matches(/[!#@$%^&*)(+=._-]/, 'Must have at least one special character: !#@$%^&*)(+=._-')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword'), null], 'Passwords should match')
          .required('Password is required'),
      })}
      onSubmit={async (values): Promise<void> => {
        const response = await resetPassword({
          variables: {
            input: { email: values.email, password: values.newPassword, token },
          },
        });
        if (response.data?.resetPassword.__typename === 'ResponseStatus') {
          if (response.data?.resetPassword.success) {
            navigate('/auth/sign-in');
          }
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
            <InputLabel htmlFor="outlined-adornment-email-resetPassword">Email Address</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-resetPassword"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email Address"
              inputProps={{}}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-resetPassword">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>
          <PasswordField
            fieldName="newPassword"
            label="New Password"
            currentValue={values.newPassword}
            passwordError={errors.newPassword}
            passwordTouched={touched.newPassword}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <PasswordField
            fieldName="confirmPassword"
            label="Confirm Password"
            currentValue={values.confirmPassword}
            passwordError={errors.confirmPassword}
            passwordTouched={touched.confirmPassword}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          {result.error && (
            <Box>
              <FormHelperText error>{result.error && result.error.message}</FormHelperText>
            </Box>
          )}
          {result.data?.resetPassword.__typename === 'ResponseStatus' &&
            !result.data?.resetPassword.success && (
              <Box>
                <FormHelperText error>{result.data.resetPassword.message}</FormHelperText>
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
              Save Password
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthResetPassword;
