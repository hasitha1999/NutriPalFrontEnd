import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, InputAdornment, Stack, TextField, styled } from "@mui/material";
import MealPlanCard from "../../component-ui/MealPlanCard";
import Widget from "../../component-ui/Widget";
import { CustomPaper } from "../../theme/CustomThemeComponents";
import RangeInput from "../../component-ui/RangeInput";
import { searchMealApi } from "../../use-cases/api-recepie";
import RecipeCard from "../../component-ui/RecipeCard";
import { CustomTextField } from "../../component-ui/CustomTextField/CustomTextField";

const CustomButton = styled((props) => <Button {...props} />)(
  ({ theme }) => ({
      backgroundColor:theme.palette.grey[500]
  })
);



const MealPlanner = () => {
  const [searchResult,setSearchResult] = useState([]);
  const [error,setError] = useState(true);
    const [request,setRequest] = useState({CarbsMax:"400",
      CarbsMin:"10",
      FatMax:"50",
      FatMin: "0",
      ProteinMax:"300",
      ProteinMin:"0",});

    const handleChange = (event) => {
      setError(false);
        setRequest((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      };


    const getRecipie = () => {
        searchMealApi(request).then((res)=>{
          setSearchResult(res.data.hits);
          });
      
    }
    const getCurrentDateFormatted = ()=> {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');

      return `${year}-${day}-${month}`;
  }
  return (
    <div>
        <CustomPaper style={{width:'90%'}}>
            <Stack direction="row" justifyContent="space-between">
                <Typography className="main-header">Meal Planner</Typography>
                <Typography className="main-header">{getCurrentDateFormatted()}</Typography>
            </Stack>
        </CustomPaper>

            <Stack direction="row">
                <Widget  mainTitle="2500 kCal" value="calories per day"  hasImage={false}></Widget>
                <Widget  mainTitle="45 g" value="fat per day" hasImage={false}></Widget>
                <Widget  mainTitle="139-202 g" value="carbs per day" hasImage={false}></Widget>
                <Widget  mainTitle="32-135 g " value="proteins per day" hasImage={false}></Widget>
 
            </Stack>
            <Stack direction="row">
            <Typography sx={{m:2}}>Ingrediants You Have</Typography>
              <CustomTextField
                  fullWidth
                  name="q"
                  onChange={handleChange}
                  required
                  type="text"
                />
            </Stack>

        <Box sx={{display:'flex', justifyContent:'center'}}>
       
        <Stack >
              <RangeInput
                name="Carbs"
                handleChange ={handleChange}
              />
              <RangeInput
                name="Fat"
                handleChange ={handleChange}
              />
              <RangeInput
                name="Protein"
                handleChange ={handleChange}
              />
          </Stack>
        </Box>
        <div style={{display:'flex', justifyContent:'flex-end'}}>

            <CustomButton variant="contained" onClick={getRecipie} sx={{ml:2,width:"5vw"}}>
            Reset
            </CustomButton>
            <Button variant="contained" onClick={getRecipie} sx={{ml:2,width:"5vw"}} >
                Generate
            </Button>
          </div>
        <Box sx={{ flexGrow: 1, width: '90%', marginTop:'15px' }}>
            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {searchResult.map((item,index)=>(
                    <Grid item xs={2} sm={4} md={3} key={index}>
                        <RecipeCard title={item.recipe.label} image={item.recipe.image} itemData={item.recipe}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    </div>
  );
}

export default MealPlanner