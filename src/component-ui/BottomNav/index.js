import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router";

const BottomNav = ({ menuRoutes, handleRoute }) => {
  const [value, setValue] = React.useState("home");
  const location = useLocation()

  useEffect(() => {
    location.pathname !== value && setValue(location.pathname)
  }, [location])

  return (
    <Box>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue((pre) => newValue);
            handleRoute(newValue);
          }}
        >
          {menuRoutes.map((route) => (
            <BottomNavigationAction
              label={route.label}
              value={route.path}
              icon={route.icon}
            ></BottomNavigationAction>
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
