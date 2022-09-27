import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

const Register: React.FC = (props) => {
  const [form, setForm] = React.useState();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Typography variant="h2" fontWeight="700">
          Register
        </Typography>
        <Typography fontWeight="700">
          Create your account and start creating new cards!
        </Typography>
        <TextField label="Name" />
        <TextField label="Email" />
        <TextField label="Password" />
        <Button variant="contained" color="primary">
          Create account
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
