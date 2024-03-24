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
          width: "15%",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "15%", boxSizing: "border-box",background: "#2C3639" },
        }}
      >
        <Box sx={{paddingTop:"75px", overflow: "auto"}}>
          <List sx={{padding:"0px"}}>
            {menuRoutes.map((route, index) => (
              <ListItem key={route.label + index} disablePadding style={location.pathname === route.path? {background:"#7DCE13",borderRadius:"20px"}: {}}>
                <ListItemButton onClick={() => handleRoute(route.path)}>
                  <ListItemIcon style={location.pathname === route.path? {color: theme.palette.primaryVariant.main}: {color: theme.palette.primaryVariant.contrastText}}>
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText primary={route.label} style={location.pathname === route.path? {color: theme.palette.primaryVariant.main}: {color: theme.palette.primaryVariant.contrastText}} />
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