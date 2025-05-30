import React, { useState } from 'react';
import {
    Avatar,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignIn = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const navigate = useNavigate()

    const onSubmit = async(e) => {
        // e.preventDefault();

        try {
            const response = await axios.post(
              `${import.meta.env.VITE_URL}/sigIn`,
              formData,
              { withCredentials: true }
            );
      
            if (response.status === 200) {
              navigate(`/OtpVerfiy/${formData.email}`);
            }
          } catch (error) {
            console.error(error);
          }
        
    };

    return (
        <div   style={{
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '20px',
            textAlign : 'center',
            width : '100vw'
        }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '30%',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="User name"
                        type="input"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        {...register('username', { required: 'User Name is required' })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Invalid email address',
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
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
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <NavLink to={'/LoginToNotes'} variant="body2">
                                Don't have an account? Sign Up
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};

export default SignIn;
