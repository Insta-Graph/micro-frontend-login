import React from 'react';

import { Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

const CardHeader: React.FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid
      container
      direction={matchDownSM ? 'column-reverse' : 'row'}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Stack alignItems="center" justifyContent="center" spacing={1}>
          <Typography
            variant="caption"
            fontSize="16px"
            textAlign={matchDownSM ? 'center' : 'inherit'}
          >
            Enter your email below to receive instructions and reset your password
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CardHeader;
