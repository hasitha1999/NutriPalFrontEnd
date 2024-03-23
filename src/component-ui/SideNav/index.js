import React from 'react'
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from '@mui/material/AppBar';
import TopBar from '../TopBar';
import { useLocation } from 'react-router';
import { useTheme } from '@mui/system';
import { Avatar, Typography } from '@mui/material';

const SideNav = ({menuRoutes, handleRoute}) => {

  const location = useLocation()
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex"}}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
          <TopBar name= "hasitha"/>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          
          width: "20%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "20%", boxSizing: "border-box",background: "linear-gradient(to bottom, #00ff00 0%, #003300 100%)" },
        }}
      >
        <Box sx={{paddingTop:"70px", overflow: "auto"}}>
          <List>
            {menuRoutes.map((route, index) => (
              <ListItem key={route.label + index} disablePadding>
                <ListItemButton onClick={() => handleRoute(route.path)}>
                  <ListItemIcon style={location.pathname === route.path? {color: theme.palette.primaryVariant.main}: {}}>
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.label} style={location.pathname === route.path? {color: theme.palette.primaryVariant.main}: {}} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SideNav