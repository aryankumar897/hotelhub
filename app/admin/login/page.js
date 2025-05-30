"use client"


import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Link, Typography, Box, Snackbar, Alert } from '@mui/material';
import HotelHubLogo from "@/components/nav/HotelHubLogo"
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!email || !password) {
            setSnackbarMessage('Email and password are required');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                setSnackbarMessage('Login successful');
                setSnackbarSeverity('success');
            } else {
                const data = await response.json();
                setSnackbarMessage(data.message || 'Login failed');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage('An error occurred. Please try again.');
            setSnackbarSeverity('error');
        }

        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="xxl">
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Box
                        component="form"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ p: 3 }}
                        onSubmit={handleLogin}
                    >
                        <Typography variant="h4" gutterBottom>
                            <HotelHubLogo/>
                        </Typography>
                        

                        <Typography variant="h4" gutterBottom>
                            Login
                        </Typography>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}



                            InputProps={{
                                style: {
                                    color: '#fff',
                                    borderColor: 'red',
                                },
                            }}
                            sx={{
                                input: { color: 'black' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'red',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'red',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'red',
                                    },
                                },
                            }}



                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                     
                     
                     
                     
                            InputProps={{
                                style: {
                                    color: '#fff',
                                    borderColor: 'red',
                                },
                            }}
                            sx={{
                                input: { color: 'black' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'red',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'red',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'red',
                                    },
                                },
                            }}
                        />
                        <Link href="/forgot-password" variant="body2" sx={{ alignSelf: 'flex-end', mt: 1 }}>
                            Forgot Password?
                        </Link>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: 'red',
                                '&:hover': {
                                    backgroundColor: 'red'
                                },
                                mt: 2,
                                width: '100%'
                            }}
                        >
                            Login
                        </Button>
                        <Link href="/signup" variant="body2" sx={{ mt: 2 }}>
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100vh',
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <Box
                            component="img"
                            src="/images/hotel17.jpg"
                            alt="Login image"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default LoginPage;
