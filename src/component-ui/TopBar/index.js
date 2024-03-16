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

const TopBar = (props) => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)};

    const handleClose = () => {
    setAnchorEl(null);
    };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Avatar
            alt="Remy Sharp"
            src="logo.jpg"
            sx={{ width: 50, height: 50 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: 2, display: { xs: "none", md: "flex" } }}
          >
           NutriPal
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, ml: 2, display: { xs: "flex", md: "none" } }}
          >
            DTF
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {auth ? (
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
              >
                <MenuItem>
                  <Link href="/profile" underline="none" color="#fff">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/" underline="none" color="#fff">
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