import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Link,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';

import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthUserApi } from '../store/Reducers/AuthUserReducer';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function LoginPage() {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setloading] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (data) => {
    setloading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/Login`,
        {
          email: data.email,
          password: data.password,
          remember,
        },
        { withCredentials: true }
      );

      if (response.status == 200) {
        toast.success('Login successfully')
         dispatch(AuthUserApi())
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed, please try again');
      console.error(error);
    }
    finally{
      setloading(false)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      trigger(); 
    }, 200);
  }, [trigger]);



  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width : '100vw',
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
        <Toaster />

      <Container maxWidth="sm">
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            borderRadius: 4,
            backgroundColor: '#fff',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" mb={2}>
            Please enter your login details
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleLogin)}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              type="email"
              autoComplete="email"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              label="Password"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              autoComplete="current-password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                  message: 'Must include a letter and number',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
            loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 1,
                backgroundColor: '#1976d2',
                ':hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Login
            </Button>
            <Typography variant="body2" align="center" mt={2}>
              Forgot your password?{' '}
              <Link href="#" underline="hover">
                Reset
              </Link>
            </Typography>
            <Typography variant="body2" align="center" mt={1}>
              Don’t have an account?{' '}
              <NavLink to="/SiginToNotes" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Sign Up
              </NavLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
