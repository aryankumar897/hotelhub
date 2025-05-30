import React from 'react';
import { Container, Grid, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';
import HotelHubLogo from "@/components/nav/HotelHubLogo"
const Footer = () => {
    return (
        <Box sx={{ backgroundColor: 'black', color: '#fff', py: 6 ,marginTop:"20px"}}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                <HotelHubLogo />
                            </Typography>
                        </Box>
                        <Typography variant="body2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor eget ante fringilla rutrum aenean sed venenatis.
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LocationOn sx={{ mr: 1 }} />
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Phone sx={{ mr: 1 }} />
                                <Typography variant="body2">+1 11-865-8655</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Email sx={{ mr: 1 }} />
                                <Typography variant="body2">support@hotelhub.com</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" gutterBottom>
                            Links
                        </Typography>
                        <Typography variant="body2"><a href="/about-us" style={{ color: '#fff', textDecoration: 'none' }}>About Us</a></Typography>
                        <Typography variant="body2"><a href="/services" style={{ color: '#fff', textDecoration: 'none' }}>Services</a></Typography>
                        <Typography variant="body2"><a href="/team" style={{ color: '#fff', textDecoration: 'none' }}>Team</a></Typography>
                        <Typography variant="body2"><a href="/gallery" style={{ color: '#fff', textDecoration: 'none' }}>Gallery</a></Typography>
                        <Typography variant="body2"><a href="/terms" style={{ color: '#fff', textDecoration: 'none' }}>Terms</a></Typography>
                        <Typography variant="body2"><a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none' }}>Privacy Policy</a></Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Useful Links
                        </Typography>
                        <Typography variant="body2"><a href="/home" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></Typography>
                        <Typography variant="body2"><a href="/blog" style={{ color: '#fff', textDecoration: 'none' }}>Blog</a></Typography>
                        <Typography variant="body2"><a href="/faq" style={{ color: '#fff', textDecoration: 'none' }}>FAQ</a></Typography>
                        <Typography variant="body2"><a href="/testimonials" style={{ color: '#fff', textDecoration: 'none' }}>Testimonials</a></Typography>
                        <Typography variant="body2"><a href="/gallery" style={{ color: '#fff', textDecoration: 'none' }}>Gallery</a></Typography>
                        <Typography variant="body2"><a href="/contact-us" style={{ color: '#fff', textDecoration: 'none' }}>Contact Us</a></Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Newsletter
                        </Typography>
                        <Typography variant="body2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor eget ante fringilla rutrum aenean sed venenatis.
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 2 }}>
                            <TextField
                                variant="outlined"
                                placeholder="Your Email*"
                                fullWidth
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        borderColor: '#fff',
                                    },
                                }}
                                sx={{
                                    input: { color: '#fff' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#fff',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#fff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#fff',
                                        },
                                    },
                                }}
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, backgroundColor: 'red', color: '#fff', '&:hover': { backgroundColor: 'red' } }}
                            >
                                Subscribe Now
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
