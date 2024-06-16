import React, { useState } from "react";
import RecipeCard from "../../component-ui/RecipeCard";
import Typography from '@mui/material/Typography';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {CheckCircle} from "@mui/icons-material";
import { Box, Grid, InputAdornment, TextField } from "@mui/material";

const MealPlanner = () => {

    const [request,setRequest] = useState({});


    const handleChange = (event) => {
        setRequest((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      };
  return (
    <div>
        <Typography variant="h3" sx={{margin:'15px 0px 0px 20px'}}>Meal Planner</Typography>
        <Box sx={{ m:10 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
              First name
              <TextField
                fullWidth
                name="firstName"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">kg</InputAdornment>
                  }}
                
                // value={user.firstName}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
              Last name
              <TextField
                fullWidth
                name="lastName"
                onChange={handleChange}
                required
                // value={user.lastName}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
             Gym ID
              <TextField
                fullWidth
                name="gymID"
                onChange={handleChange}
                required
                // value={user.gymID}
              />
            </Grid>
            
          </Grid>
          <Grid container spacing={3} sx={{ mt:3}}>
            <Grid xs={12} md={3} sx={{ mr:2}}>
              First name
              <TextField
                fullWidth
                name="firstName"
                onChange={handleChange}
                required
                // value={user.firstName}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2}}>
              Last name
              <TextField
                fullWidth
                name="lastName"
                onChange={handleChange}
                required
                // value={user.lastName}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
             Gym ID
              <TextField
                fullWidth
                name="gymID"
                onChange={handleChange}
                required
                // value={user.gymID}
              />
            </Grid>
            
          </Grid>
        </Box>
    </div>
  );
}

export default MealPlanner