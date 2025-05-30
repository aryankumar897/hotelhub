"use client"; // Ensure this is at the top for Next.js to handle the client-side component

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

// List of countries for the dropdown
const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  // Add more countries as needed
];

export default function ProfileUpdateForm() {
  // Define state variables to store user input and related data
  const [name, setName] = useState(""); // Stores the user's name input.
  const [email, setEmail] = useState(""); // Stores the user's email input.
  const [password, setPassword] = useState(""); // Stores the user's password input.
  const [confirmPassword, setConfirmPassword] = useState(""); // Stores the confirmation password input.
  const [mobileNumber, setMobileNumber] = useState(""); // Stores the user's mobile number
  const [address, setAddress] = useState(""); // Stores the user's address
  const [country, setCountry] = useState(""); // Stores the selected country
  const [profileImage, setProfileImage] = useState(null); // Stores the selected image file (before upload).
  const [profileImagePreview, setProfileImagePreview] = useState(""); // Stores the image preview URL.
  const [errors, setErrors] = useState({}); // Stores validation errors for form fields.
  const [serverMessage, setServerMessage] = useState(""); // Stores messages from the server (success/error).
  const [isSuccess, setIsSuccess] = useState(false); // Tracks if form submission was successful or not.

  // useEffect hook runs after the component mounts (only once) to fetch user data from the server.
  useEffect(() => {
    fetchUserData(); // Call the function to fetch user data from the API.
  }, []); // Empty dependency array means this useEffect runs only once when the component is first loaded.

  // Function to fetch user data from the server API.
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/profile`); // Make a GET request to fetch user data.

      // Check if the response is unsuccessful (status code not in 200 range).
      if (!response.ok) {
        throw new Error("Failed to fetch user data"); // Throw an error if response fails.
      }

      const data = await response.json(); // Convert the response into JSON format.

      // Update state with fetched user details.
      setEmail(data?.email); // Set email from API response.
      setName(data?.name); // Set name from API response.
    //  setProfileImagePreview(data?.image); // Set profile image preview from API response.
      setMobileNumber(data?.mobileNumber || ""); // Set mobile number if available
      setAddress(data?.address || ""); // Set address if available
      setCountry(data?.country || ""); // Set country if available
    } catch (error) {
      console.log("Error fetching user data:", error); // Log the error in case of failure.
    }
  };

  // Function to validate form input fields.
  const validateForm = () => {
    const errors = {}; // Create an empty object to store validation errors.

    // Check if name field is empty.
    if (!name) errors.name = "Name is required";

    // Validate email field.
    if (!email) {
      errors.email = "Email is required"; // Check if email is empty.
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid"; // Use regex to validate email format.
    }

    // Validate mobile number (exactly 10 digits)
    if (mobileNumber && !/^[0-9]{10}$/.test(mobileNumber)) {
      errors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    // Validate address
    if (address && address.length < 5) {
      errors.address = "Address is too short";
    }

    // Validate country
    if (
      country &&
      !countries.some((c) => c.code === country || c.name === country)
    ) {
      errors.country = "Please select a valid country";
    }

    // Check if password is provided.
    if (!password) errors.password = "Password is required";

    // Check if password and confirmPassword match.
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setErrors(errors); // Update state with validation errors.

    return Object.keys(errors).length === 0; // Return true if there are no validation errors.
  };

  // Function to handle profile image selection.
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file.

    if (file) {
      setProfileImage(file); // Store the selected file in state.

      const reader = new FileReader(); // Create a FileReader to read the file.
      reader.onloadend = () => {
        setProfileImagePreview(reader.result); // Update the preview with the base64 URL of the image.
      };
      reader.readAsDataURL(file); // Convert the image file to a Data URL.
    }
  };

  // Function to upload an image to Cloudinary and return the uploaded image URL.
  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData(); // Create FormData object to send the image file.
    formData.append("file", image); // Attach the image file.
    formData.append("upload_preset", "ml_default"); // Attach the Cloudinary upload preset.

    // Make a POST request to Cloudinary's API to upload the image.
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST", // HTTP method is POST since we are uploading data.
        body: formData, // Attach the form data containing the image.
      }
    );

    const data = await response.json(); // Convert response into JSON format.
    return data.secure_url; // Return the URL of the uploaded image.
  };

  // Function to handle form submission when the user clicks the submit button.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    setServerMessage(""); // Clear any previous server messages.

    // Validate the form fields before submitting the data.
    if (!validateForm()) return; // Stop submission if validation fails.

    let imageUrl = profileImagePreview; // Variable to store the uploaded image URL.

    // If a new profile image was selected, upload it to Cloudinary.
    if (profileImage) {
      imageUrl = await uploadImageToCloudinary(profileImage); // Upload image and store the URL.
      setIsSuccess(true); // Mark success as true.
      setServerMessage("Image uploaded successfully"); // Update message.
    }

    // Prepare the request body with user data.
    const requestBody = {
      name, // User's name.
      email, // User's email.
      password, // User's password.
      mobileNumber, // User's mobile number
      address, // User's address
      country, // User's country
      profileImage: imageUrl, // Use the uploaded image URL.
    };

    // Send the user profile update request to the backend API.
    const response = await fetch(`${process.env.API}/user/profile`, {
      method: "POST", // Use POST method to send data.
      headers: {
        "Content-Type": "application/json", // Specify JSON content type.
      },
      body: JSON.stringify(requestBody), // Convert request body to JSON format.
    });

    const data = await response.json(); // Parse the server response.

    // Handle the server response based on success or failure.
    if (!response.ok) {
      setIsSuccess(false); // Set success state to false.
      setServerMessage(data.err); // Display the error message from the server.
    } else {
      setIsSuccess(true); // Set success state to true.
      setServerMessage(data.msg); // Display the success message from the server.
      setPassword(""); // Clear password field after successful submission.
      setConfirmPassword(""); // Clear confirm password field.
    }
  };

  return (
    <>
     
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            maxWidth: 1300,
            margin: "0 auto",
            padding: 2,
            overflow: "hidden",
          //  backgroundColor: "rgba(31, 15, 15, 0.6)",
            marginTop: "29px",
            padding: "40px",
            color: "white",
          }}
        >



       {
       profileImagePreview&& (

        <Box
        sx={{
          order: { xs: 2, sm: 1 },
          flex: { xs: "none", sm: 1 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {profileImagePreview && (
          <Box mt={2} textAlign="center">
            <div className="image-container">
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="profile-image"
              />
            </div>
          </Box>
        )}
      </Box> 



       )
        
       }


          <Box
            sx={{
              order: { xs: 1, sm: 2 },
              flex: { xs: 1, sm: 2 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography 
             sx={{
                color:"#8A12FC"
             }}
            
            
            variant="h4" component="h1" gutterBottom>
              Update Profile
            </Typography>
            {serverMessage && (
              <Alert severity={isSuccess ? "success" : "error"}>
                {serverMessage}
              </Alert>
            )}
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: { color: "#8A12FC" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: {   color:"#8A12FC" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />
            <TextField
              label="Mobile Number"
              variant="outlined"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: {   color:"#8A12FC" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
              multiline
              rows={3}
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                textarea: {   color:"#8A12FC" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="country-select-label" sx={{   color:"black" }}>
                Country
              </InputLabel>
              <Select
                labelId="country-select-label"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                label="Country"
                error={!!errors.country}
                sx={{
                  color:"#8A12FC",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8A12FC",
                  },
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && (
                <Typography variant="caption" color="error">
                  {errors.country}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: {  color:"#8A12FC" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
              InputLabelProps={{
                style: { color: "#8A12FC" },
              }}
              sx={{
                mb: 3,
                input: {   color:"#8A12FC"},
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                backgroundColor: "#8A12FC",
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                    backgroundColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            >
              Upload Profile Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#8A12FC",
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8A12FC",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8A12FC",
                    backgroundColor: "#8A12FC",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8A12FC",
                  },
                },
              }}
            >
              Update Profile
            </Button>
          </Box>
          <style jsx>{`
            .image-container {
              width: 280px;
              height: 280px;
              border-radius: 50%;
              overflow: hidden;
              margin-top: 50px;
              display: inline-block;
              padding: 5px;
              background: linear-gradient(
                45deg,
                rgba(238, 130, 238, 1),
                rgba(255, 192, 203, 1),
                rgba(255, 165, 0, 1)
              );
              background-size: 200% 200%;
              animation: gradientAnimation 2s ease infinite;
            }
            .profile-image {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            }
            @keyframes gradientAnimation {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}</style>
        </Box>
     
    </>
  );
}
