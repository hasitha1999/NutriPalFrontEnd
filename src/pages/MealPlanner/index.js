import React from "react";
import RecipeCard from "../../component-ui/RecipeCard";
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {CheckCircle} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";

const MealPlanner = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setDrawerOpen(newOpen);
    };


  return (
    <div>
        <Typography variant="h3" sx={{margin:'15px 0px 0px 20px'}}>Meal Planner</Typography>

        <Box sx={{ flexGrow: 1, width: '90%', margin:'5px auto' }}>
            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {/* {dummyCardData.map((item,index)=>( */}
                    <Grid item xs={2} sm={4} md={3} key={1}>
                        <RecipeCard title={"hasitha"} image='https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg' description={"pizza"}/>
                    </Grid>
                {/* ))} */}
            </Grid>
        </Box>

        <List>
            <ListItem>
                <ListItemIcon>
                    <CheckCircle /> {/* Use your desired icon */}
                </ListItemIcon>
                <ListItemText primary="Item 1" />
            </ListItem>
            {/* Add more list items as needed */}
        </List>
    </div>
  );
}

export default MealPlanner