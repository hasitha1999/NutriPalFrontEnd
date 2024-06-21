import React from "react";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import routeConfig from "../../config/route-config";
import { useLocation } from "react-router-dom";

const SidebarItems = ({ toggleMobileSidebar }) => {

    const location = useLocation();

    return (
        <Box sx={{ px: 3, mt: 4 }}>
            <List sx={{ pt: 0 }} className="sidebarNav" component="div">
                {routeConfig.map((item) => {
                    if (item.menu) {
                        return <NavItem
                            item={item}
                            key={item.id}
                            onClick={toggleMobileSidebar}
                            pathDirect={location.pathname}
                        />
                    } else {
                        return <></>
                    }
                })}
            </List>
        </Box>
    );
};
export default SidebarItems;