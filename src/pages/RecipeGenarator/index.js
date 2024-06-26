import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, InputAdornment, Skeleton, Stack, TextField, styled } from "@mui/material";
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



const RecipeGenarator = () => {
  const [searchResult,setSearchResult] = useState([]);
  const [error,setError] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
    const [request,setRequest] = useState({q:"",CarbsMax:"400",
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
      setIsLoading(true);
        searchMealApi(request).then((res)=>{
          setSearchResult(res.data.hits);
          setIsLoading(false);
          });
      
    }
    const resetAll = () =>{
        setRequest({q:"",CarbsMax:"400",
          CarbsMin:"10",
          FatMax:"50",
          FatMin: "0",
          ProteinMax:"300",
          ProteinMin:"0",})
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
                <Typography className="main-header">Recipe Generator</Typography>
                <Typography className="main-header">{getCurrentDateFormatted()}</Typography>
            </Stack>
        </CustomPaper>
        <CustomPaper style={{width:'90%'}}>
            <Stack direction="row" >
                <Widget  mainTitle="2500 kCal" value="calories per day"  hasImage={false}></Widget>
                <Widget  mainTitle="45 g" value="fat per day" hasImage={false}></Widget>
                <Widget  mainTitle="139-202 g" value="carbs per day" hasImage={false}></Widget>
                <Widget  mainTitle="32-135 g " value="proteins per day" hasImage={false}></Widget>
 
            </Stack>
        </CustomPaper>
        <CustomPaper style={{width:'90%'}}>
            <Stack direction="row">
            <Typography sx={{m:2}}>Ingrediants You Have</Typography>
              <CustomTextField
                  fullWidth
                  name="q"
                  onChange={handleChange}
                  value={request.q}
                  required
                  type="text"
                />
            </Stack>

        <Box sx={{display:'flex', justifyContent:'center'}}>
       
        <Stack >
              <RangeInput
                name="Carbs"
                handleChange ={handleChange}
                values = {[request.CarbsMax,request.CarbsMin]}
              />
              <RangeInput
                name="Fat"
                handleChange ={handleChange}
                values = {[request.FatMax,request.FatMin]}
              />
              <RangeInput
                name="Protein"
                handleChange ={handleChange}
                values = {[request.ProteinMax,request.ProteinMin]}
              />
          </Stack>
        </Box>
        <div style={{display:'flex', justifyContent:'flex-end'}}>

            <CustomButton variant="contained" onClick={resetAll} sx={{ml:2,width:"5vw",bgcolor:"gray"}}>
            Reset
            </CustomButton>
            <Button variant="contained" onClick={getRecipie} sx={{ml:2,width:"5vw"}} >
                Generate
            </Button>
          </div>
        <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
          {isLoading ? (
            <RecipeGeneratorSkeleton />
          ) : (
            <Grid
              container
              spacing={{ xs: 2, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {searchResult.map((item, index) => (
                <Grid item xs={2} sm={4} md={3} key={index}>
                  <RecipeCard
                    title={item.recipe.label}
                    image={item.recipe.image}
                    itemData={item.recipe}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </CustomPaper>
    </div>
  );
}

export default RecipeGenarator

const RecipeGeneratorSkeleton = () => (
  <>
    <Grid
      container
      spacing={{ xs: 2, md: 1 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
      <Grid item xs={2} sm={4} md={3} mt={4}>
        <Skeleton variant="rounded" height={300} />
      </Grid>
    </Grid>
  </>
);