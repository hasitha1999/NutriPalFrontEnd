import { Box } from "@mui/material";

const LoginLayout = (props) => {
  return (
      <Box sx={{ float: "right", width: { xs: "100%", md: "100%" ,mb:10} ,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",height:"100vh"}}>
        {props.children}
      </Box>
  );
};

export default LoginLayout;
