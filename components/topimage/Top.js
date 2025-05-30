// components/UserDashboard.js
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import Image from 'next/image';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const UserDashboard = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '400px',
                backgroundImage: 'url(/images/hotel17.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
                padding: '20px',
                marginBottom:"40px"
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                }}
            >
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ color: '#fff' }}
                >
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="inherit">User Dashboard</Typography>
                </Breadcrumbs>
              
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    padding: '10px 20px',
                    borderRadius: '8px',
                }}
            >
                <Typography variant="h3" component="h1">
                    User Dashboard
                </Typography>
            </Box>
        </Box>
    );
};

export default UserDashboard;
