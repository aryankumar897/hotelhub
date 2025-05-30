"use client"
const images = [
    '/images/hotel1.jpg',
    '/images/hotel2.jpg',
    '/images/hotel3.jpg',
    '/images/hotel4.jpg',
    '/images/hotel5.jpg',
    '/images/hotel6.jpg',
    '/images/hotel12.jpg',
    '/images/hotel13.jpg',
    '/images/hotel14.jpg',
    '/images/hotel15.jpg',
    '/images/hotel16.jpg',
];

// components/ImageGallery.js
import { useState } from 'react';
import { Container, Box, Modal, Grid, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Top from "@/components/topimage/Top"

const ImageGallery = () => {
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const handleOpen = (image) => {
        setCurrentImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentImage('');
    };

    return (
        <>

            <Container maxWidth="xl"     >
                <Top/>

            <Grid container spacing={2} justifyContent="center">
                {images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                            component="div"
                            sx={{
                                overflow: 'hidden',
                                cursor: 'pointer',
                                '&:hover img': {
                                    transform: 'scale(1.1)',
                                },
                            }}
                            onClick={() => handleOpen(image)}
                        >
                            <Image
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                layout="responsive"
                                width={500}
                                height={300}
                                style={{
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: '80%',
                        maxWidth: 800,
                        outline:"none"
                    }}
                >
                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Image Preview
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Image
                            src={currentImage}
                            alt="Modal Image"
                            layout="responsive"
                            width={800}
                            height={600}
                        />
                    </Box>
                </Box>
            </Modal>



            </Container>

        </>
    );
};

export default ImageGallery;
