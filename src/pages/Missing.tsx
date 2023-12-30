import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Missing = () => {
  return (
    <article>
      <Typography variant="h2" align="center">
        Oops!
      </Typography>
      <Typography align="center">Page Not Found</Typography>
      <Typography align="center">
        <Link to="/">Go to Login</Link>
      </Typography>
    </article>
  );
};

export default Missing;
