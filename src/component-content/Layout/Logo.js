import { Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const LinkStyled = styled(Link)(({theme}) => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10px',
  marginbottom: '20px',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <img src="/logo.png" alt="logo" height={60} width={65} priority />
      <Typography variant="h2">NutriPal</Typography>
    </LinkStyled>
  );
};

export default Logo;