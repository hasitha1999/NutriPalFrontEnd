import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material";

const MealPlanner = () => {
    const [request,setRequest] = useState({ Calories:0,
        FatContent: 0,
        SaturatedFatContent: 0,
        CholesterolContent: 0,
        SodiumContent: 0,
        CarbohydrateContent: 0,
        FiberContent: 0,
        SugarContent: 0,
        ProteinContent: 0});
        
    const handleChange = (event) => {
        setRequest((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      };
  return (
    <div>
        <Typography variant="h3" sx={{margin:'15px 0px 0px 20px'}}>Meal Planner</Typography>
        <Box sx={{ m:10}}>
          <Grid container spacing={3}>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
            Calories
              <TextField
                fullWidth
                name="Calories"
                onChange={handleChange}
                required
                type="number"
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
             Fat Content
              <TextField
                fullWidth
                name="FatContent"
                type="number"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
            SaturatedFat Content
              <TextField
                fullWidth
                type="number"
                name="SaturatedFatContent"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            
        </Grid>
        <Grid container spacing={3} sx={{ mt:3}}>
            <Grid xs={12} md={3} sx={{ mr:2}}>
            Cholesterol Content
              <TextField
                fullWidth
                type="number"
                name="CholesterolContent"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2}}>
            Sodium Content
              <TextField
                fullWidth
                type="number"
                name="SodiumContent"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
            Carbohydrate Content
              <TextField
                fullWidth
                type="number"
                name="CarbohydrateContent"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            
          </Grid>
          <Grid container spacing={3} sx={{ mt:3}}>
            <Grid xs={12} md={3} sx={{ mr:2}}>
            Fiber Content
              <TextField
                fullWidth
                type="number"
                name="FiberContent"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2}}>
            Sugar Content
              <TextField
                fullWidth
                type="number"
                name="SugarContent"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            <Grid xs={12} md={3} sx={{ mr:2 }}>
            Protein Content
              <TextField
                fullWidth
                type="number"
                name="ProteinContent"
                onChange={handleChange}
                required
                InputProps={{
                    endAdornment : <InputAdornment position="end">g</InputAdornment>
                  }}
              />
            </Grid>
            
          </Grid>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <Button variant="contained" color="success">
                Submit
            </Button>
          </div>

        </Box>
    </div>
  );
}

export default MealPlanner