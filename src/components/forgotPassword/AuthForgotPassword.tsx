import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForgotPasswordMutation } from '@snapify/shared-modules';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AuthRegister: React.VFC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const theme = useTheme();
  const [forgotPassword, result] = useForgotPasswordMutation();

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email(),
      })}
      onSubmit={(values): void => {
        forgotPassword({
          variables: {
            input: { ...values },
          },
        }).then(() => {
          setShowAlert(true);
        });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }): JSX.Element => (
        <form onSubmit={handleSubmit}>
          <Snackbar open={showAlert} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: '100%' }}>
              An email was sent with the instructions!
            </Alert>
          </Snackbar>
          <FormControl
            fullWidth
            error={Boolean(touched.email && errors.email)}
            sx={theme.typography.customInput as SxProps<Theme>}
          >
            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-register"
              type="text"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="standard-weight-helper-text--register">
                {errors.email}
              </FormHelperText>
            )}
          </FormControl>

          {result.error && (
            <Box>
              <FormHelperText error>{result.error && result.error.message}</FormHelperText>
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
              Reset Password
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthRegister;
