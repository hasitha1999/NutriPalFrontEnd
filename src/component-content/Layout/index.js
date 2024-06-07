import { Box } from "@mui/material";
import SideNav from "../../component-ui/SideNav";
import TopBar from "../../component-ui/TopBar";
import BottomNav from "../../component-ui/BottomNav";
import routeConfig from "../../config/route-config";
import { useNavigate } from "react-router";
import cover from "../../bgImg.webp" 

const Layout = (props) => {
  const role = sessionStorage.getItem("ROLE");
  // const role = "ADMIN"
  const menuRoutes = routeConfig.filter((route) => route.menu && route?.roles?.find(routeRole => routeRole === role));

  const navigate = useNavigate();

  const handleRoute = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ float: "right", width: { xs: "100%", md: "85%" },backgroundImage:`url("/bgImg.webp")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",height:"100vh"}}>
      <Box sx={{ mr: 2, display: { xs: "none", md: "flex" }, width: "15%" }}>
        <SideNav menuRoutes={menuRoutes} handleRoute={handleRoute} />
      </Box>
      <header>
        <Box sx={{ visibility: { xs: "visible", md: "hidden" } }}>
          <TopBar/>
        </Box>
      </header>
      <Box sx={{ float: "right", width: { xs: "100%", md: "100%" ,mb:10} }}>
        {props.children}
      </Box>
      <footer>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <BottomNav menuRoutes={menuRoutes} handleRoute={handleRoute} />
        </Box>
      </footer>
    </Box>
  );
};

export default Layout;
