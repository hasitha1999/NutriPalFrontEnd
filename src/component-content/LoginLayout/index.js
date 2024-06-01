import { Box } from "@mui/material";
import cover from "../../loginBg.jpeg"

const Layout = (props) => {
  return (
      <Box sx={{ float: "right", width: { xs: "100%", md: "100%" ,mb:10},backgroundImage:`url(${cover})` ,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"}}>
        {props.children}
      </Box>
  );
};

export default Layout;
