import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  RootContainer,
  Header,
  StyledImage,
  StyledButton,
  ColorfulLoader,
  ErrorMessage,
  MainTitle,
} from "./styles";

export default function Home() {
  const [promo, setPromo] = useState({
    mainTitle: "",
    shortDesc: "",
    linkUrl: "",
    photoUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const response = await fetch(`${process.env.API}/bookarea`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

      
        setTimeout(() => {
          
          setPromo({
            mainTitle:
              data.mainTitle ||
              "We Are the Best in All-time & So Please Get a Quick Booking",
            shortDesc:
              data.shortDesc ||
              "Atoli is one of the best resorts in the global market and that's why you will get a luxury life period on the global market. We always provide you a special support for all of our guests and that's will be the main reason to be the most popular.",
            linkUrl: data.linkUrl || "#",
            photoUrl: data.photoUrl || "/images/hotel18.webp",
          });
  


          setLoading(false);
        }, 4000);
      } catch (err) {
        setError(err.message);
        setTimeout(() => setLoading(false), 4000);
        console.log("Fetch error:", err);
      }
    };

    fetchPromoData();
  }, []);

  if (loading) return <ColorfulLoader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <RootContainer maxWidth="xl">
      <MainTitle />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Header variant="h3">{promo.mainTitle}</Header>
            <Typography variant="body1" paragraph>
              {promo.shortDesc}
            </Typography>
            <StyledButton
              variant="contained"
              href={promo.linkUrl}
              sx={{
                background: "linear-gradient(90deg, #FF3CAC 0%, #784BA0 100%)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                },
              }}
            >
              Book Now
            </StyledButton>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledImage
            src={promo.photoUrl}
            alt="Luxury Resort"
            onError={(e) => {
              e.target.src = "/images/hotel18.webp";
            }}
          />
        </Grid>
      </Grid>
    </RootContainer>
  );
}
