import React from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import LoginIcon from "@mui/icons-material/Login";
import Link from "@mui/material/Link";
import { useTheme } from '@mui/system';
const TopBar = (props) => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)};

    const handleClose = () => {
    setAnchorEl(null);
    };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" sx={{background: "#2C3639"}}>
        <Toolbar>
        <Avatar
              alt="logo"
              src="logo.png"
              sx={{ width: 70, height: 70 }}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{ml: 2, display: { xs: "none", md: "flex" } ,color:"#7DCE13"}}
              
            >
            NutriPal
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ ml: 2, display: { xs: "flex", md: "none" },color:"#7DCE13"}}

            >
              NutriPal
            </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {auth ? (
            <Box sx={{ display: "flex" }}>
              <IconButton
                // size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{color:"#7DCE13"}}
              >
                <AccountCircle sx={{width: "2em", height: "2em"}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{marginTop:"50px"}}
              >
                <MenuItem sx={{width:"200px"}}>
                  <Link href="/profile" underline="none" color="inherit">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/" underline="none" color="inherit">
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" endIcon={<LoginIcon />}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar