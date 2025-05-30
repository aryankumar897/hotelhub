"use client";

import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Link,
  Typography,
  Box,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import HotelHubLogo from "@/components/nav/HotelHubLogo";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !phone || !email || !password) {
      setSnackbarMessage("All fields are required");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // Validate phone number is exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      setSnackbarMessage("Please enter a valid 10-digit phone number");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // Validate email format (basic check)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSnackbarMessage("Please enter a valid email address");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, password }),
      });

      if (response.ok) {
        setSnackbarMessage("Registration successful");
        setSnackbarSeverity("success");
        // Clear form on successful registration
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
      } else {
        const data = await response.json();
        setSnackbarMessage(data.message || "Registration failed");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("An error occurred. Please try again.");
      setSnackbarSeverity("error");
    }

    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xxl">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 3 }}
            onSubmit={handleRegister}
          >
            <Typography variant="h4" gutterBottom>
              <HotelHubLogo />
            </Typography>

            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                style: {
                  color: "#fff",
                  borderColor: "red",
                },
              }}
              InputLabelProps={{
                style: { color: "red" },
              }}
              sx={{
                input: { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red",
                  },
                  "&:hover fieldset": {
                    borderColor: "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                },
              }}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                style: {
                  color: "#fff",
                  borderColor: "red",
                },
              }}
              InputLabelProps={{
                style: { color: "red" },
              }}
              sx={{
                input: { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red",
                  },
                  "&:hover fieldset": {
                    borderColor: "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                },
              }}
            />
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
                  color: "#fff",
                  borderColor: "red",
                },
              }}
              InputLabelProps={{
                style: { color: "red" },
              }}
              sx={{
                input: { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red",
                  },
                  "&:hover fieldset": {
                    borderColor: "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
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
                  color: "#fff",
                  borderColor: "red",
                },
              }}
              InputLabelProps={{
                style: { color: "red" },
              }}
              sx={{
                input: { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red",
                  },
                  "&:hover fieldset": {
                    borderColor: "red",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                },
              }}
            />



<Divider sx={{ mt: 2 }}>or</Divider>
         
            <Button
            fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              
            
              sx={{
                color:"white",
                  backgroundColor: 'red',
                  '&:hover': {
                    color:"white",
                      backgroundColor: 'red'
                  },
                  mt: 2,
                  width: '100%'
              }}
             
              onClick={() => signIn("google")}
            >
              Log In with Google
            </Button>




            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "red",
                "&:hover": {
                  backgroundColor: "red",
                },
                mt: 2,
                width: "100%",
              }}
            >
              Register
            </Button>
            <Link href="/login" variant="body2" sx={{ mt: 2 }}>
              Already have an account? Login
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              component="img"
              src="/images/register.jpeg"
              alt="Register image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterPage;
