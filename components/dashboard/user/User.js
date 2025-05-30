"use client";
import React, { useEffect,useState  } from "react";

import { styled, useTheme, useMediaQuery, Divider } from "@mui/material";
import { Tabs, Tab, Box, Avatar } from "@mui/material";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import Dashboard from "./Dashboard";
 import PersonolInfo from './PersonolInfo.js';

 import ChangePassword from './ChangePassword';

// import Message from './Message';

// import Orders from './Orders';

// import Reservation from './Reservation';

// import Review from "./Review"

// import WishList from './WishList'
 import LogOut from "./Logout"
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "250px",
  height: "250px",
  margin: "auto",
  border: "5px solid red",
  borderRadius: "50%",
  marginBottom: "16px",
  marginTop: "36px",
  transition: "transform 0.2s ease-in-out",
  transform: "scale(1.2)",
  "&:hover": {
    animation: "moveLeftRight 1s infinite",
  },
  "@keyframes moveLeftRight": {
    "0%": {
      transform: "translateX(0)",
    },
    "50%": {
      transform: "translateX(20px)",
    },
    "100%": {
      transform: "translateX(0)",
    },
  },
}));

const StyledDivider = styled("div")(({ theme }) => ({
  width: "100%", // full width
  height: "5px", // height of the divider
  background:
    "linear-gradient(45deg,  #ff6666, #ff8080, #ff9999,  #ffcccc, #ffb3b3, #002bff, #ff3333, #ff4d4d)",
  backgroundSize: "400% 400%",
  animation: "gradientBorder 5s ease infinite",
  "@keyframes gradientBorder": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
}));
// Styled components
const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  borderBottom: `6px solid ${theme.palette.divider}`,

  [theme.breakpoints.down("sm")]: {
    borderRight: "none",
    borderBottom: `6px solid ${theme.palette.divider}`,
  },
}));

const TabPanel = styled(Box)(({ theme }) => ({
  flexGrow: 5,
  padding: theme.spacing(2),
}));

const TabIconContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});



function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme(); // Correct usage of useTheme hook
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Correct usage of useMediaQuery
  const [profileImagePreview, setProfileImagePreview] = useState(""); // Stores the image preview URL.



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
     
      setProfileImagePreview(data?.image); // Set profile image preview from API response.
   
    } catch (error) {
      console.log("Error fetching user data:", error); // Log the error in case of failure.
    }
  };



  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("activeTab");
      if (storedValue) {
        setValue(parseInt(storedValue, 10));
      }
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTab", newValue);
    }
  };
  return (
    <Box
      sx={{
        margin: "0 auto",
        width: "80%",
        maxWidth: "1370px",
      }}
    >
     

      <StyledAvatar alt="User" src={profileImagePreview    ||   "/images/pic1.png" } />

      <StyledDivider />

      <Root>
        <StyledTabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            flexGrow: isSmallScreen ? 0 : 1,
          }}
        >
          <Tab
            icon={<HomeIcon />}
            label="Dashboard"
            iconPosition="start"
            sx={{
              backgroundColor: value === 0 ? "#ffcccc" : "inherit",
              borderBottom: value === 0 ? "2px solid red" : "none",

              color: "red",
              "&:hover": {
                color: "red",
              },
            }}
          />
          <Tab
            icon={<InfoIcon />}
            label="Personol Info "
            iconPosition="start"
            sx={{
              backgroundColor: value === 1 ? "#ffcccc" : "inherit",
              borderBottom: value === 1 ? "2px solid red" : "none",

              color: "red",
              "&:hover": {
                color: "red",
              },
            }}
          />
          <Tab
            icon={<ContactMailIcon />}
            label="ChgangePassword"
            iconPosition="start"
            sx={{
              backgroundColor: value === 2 ? "#ffcccc" : "inherit",
              borderBottom: value === 2 ? "2px solid red" : "none",

              color: "red",
              "&:hover": {
                color: "red",
              },
            }}
          />
          <Tab
            icon={<SettingsIcon />}
            label="Booking Details"
            iconPosition="start"
            sx={{
              backgroundColor: value === 3 ? "#ffcccc" : "inherit",
              borderBottom: value === 3 ? "2px solid red" : "none",

              color: "red",
              "&:hover": {
                color: "red",
              },
            }}
          />
          <Tab
            icon={<PersonIcon />}
            label="Logout"
            iconPosition="start"
            sx={{
              backgroundColor: value === 4 ? "#ffcccc" : "inherit",
              borderBottom: value === 4 ? "2px solid red" : "none",

              color: "red",
              "&:hover": {
                color: "red",
              },
            }}
          />
        </StyledTabs>
        <TabPanel>
          {value === 0 && (
            <div>
              <h2>
                <Dashboard />
              </h2>
            </div>
          )}
         
          
          {value === 1 && (
                        <div>
                            <h2><PersonolInfo/></h2>
                          
                        </div>
                    )}

                  
                    {value === 2 && (
                        <div>
                            <ChangePassword />
                        </div>
                    )}



                    {/* {value === 3 && (
                        <div>
                            <Booking />
                        </div>
                    )}  */}


                    
                    {value === 4 && (
                        <div>
                            <LogOut/>
                        </div>
                    )} 


                  
        </TabPanel>
      </Root>
    </Box>
  );
}

export default VerticalTabs;
