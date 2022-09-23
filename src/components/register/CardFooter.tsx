import React from 'react';

import { Typography } from '@mui/material';
import { Link } from '@reach/router';

const CardFooter: React.FC = () => {
  return (
    <Link to="/sign-in" style={{ textDecoration: 'none' }}>
      <Typography variant="subtitle1" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
        Already have an account?
      </Typography>
    </Link>
  );
};

export default CardFooter;
