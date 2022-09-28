import { useState } from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import useAuth from '../hooks/useAuth';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const Login: React.FC = (props) => {
  const { onLogin } = useAuth();

  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = values;
    onLogin({ email, password });
  };

  return (
    <Container>
      <Typography variant="h3">Login</Typography>
      {/* <Typography>Type your email and login to access your account.</Typography> */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
      >
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
      <Typography>Forgot password?</Typography>
      <Typography>Don't have an account? Sign up</Typography>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  background-color: aliceblue;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
