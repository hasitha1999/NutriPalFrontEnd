import React from 'react'
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CampaignIcon from "@mui/icons-material/Campaign";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const Me = () => {
  let navigate = useNavigate();
  const routeChange = (value) => {
    navigate(value);
  };
  return (
    <div>
      <Stack spacing={1} direction="column" sx={{ m: 2, mb: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="secondary"
            startIcon={<TrendingUpIcon />}
            size="large"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "20px",
            }}
            onClick={() => {
              routeChange(`/assetDetails`);
            }}
          >
            Trading Commission
          </Button>
          <ArrowForwardIosIcon />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="secondary"
            startIcon={<StorefrontIcon sx={{ mr: 2 }} />}
            size="large"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "20px",
            }}
            onClick={() => {
              routeChange(`/teamActivity`);
            }}
          >
            Team Activities
          </Button>
          <ArrowForwardIosIcon />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="secondary"
            size="large"
            startIcon={<CampaignIcon sx={{ mr: 2 }} />}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "20px",
            }}
          >
            Bulletin Board
          </Button>
          <ArrowForwardIosIcon />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="secondary"
            startIcon={<AssignmentIcon sx={{ mr: 2 }} />}
            size="large"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "20px",
            }}
            onClick={() => {
              routeChange(`/rules`);
            }}
          >
            Rules
          </Button>
          <ArrowForwardIosIcon />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="secondary"
            size="large"
            startIcon={<StarIcon sx={{ mr: 2 }} />}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
            }}
          >
            Event Halls
          </Button>
          <ArrowForwardIosIcon />
        </Box>
      </Stack>
      <Box align="center">
        <Button
          sx={{ mt: "10%", width: "80%", border: "1px solid #fff" }}
          variant="contained"
          onClick={() => {
            routeChange(`/login`);
          }}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
}

export default Me