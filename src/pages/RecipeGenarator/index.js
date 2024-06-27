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

const data = {q:"",CarbsMax:"0",
  CarbsMin:"0",
  FatMax:"0",
  FatMin: "0",
  ProteinMax:"0",
  ProteinMin:"0",}

const RecipeGenarator = () => {
  const [searchResult,setSearchResult] = useState([]);
  const [formErrorMessages, setFormErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
    const [request,setRequest] = useState({...data});

    const handleChange = (event) => {

        setRequest((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      };


    const getRecipie = (event) => {
      event.preventDefault();
      let errors = false;
      let errorMessages = {};
      Object.keys(request).map((key)=>{
        let validation = validateInput(request[key])
        if(validation !== null){
          errorMessages[key] = validation;
          errors = true;
        }
      })
      if (errors) {
        setFormErrorMessages(()=>errorMessages);
        return;
      }else{
        setFormErrorMessages({});
      }
      console.log(errorMessages)

      setIsLoading(true);
        searchMealApi(request).then((res)=>{
          setSearchResult(res.data.hits);
          setIsLoading(false);
          });
      

      
    }

    function validateInput(InputData){
      if(InputData.trim() === "" ){
        return "Required"
      }
      else if(InputData > 1000){
        return "Input value Out of bound";
      }else if(InputData <= 0){
        return "Input value Out of bound";
      }else{
        return null
      }
    }

    const resetAll = () =>{
        setRequest({...data})
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
                  error={formErrorMessages.q?true:false}
                  helperText={formErrorMessages.q}
                  type="text"
                />
            </Stack>

        <Box sx={{display:'flex', justifyContent:'center'}}> 
        <Stack >
              <RangeInput
                name="Carbs"
                handleChange ={handleChange}
                values = {[request.CarbsMax,request.CarbsMin]}
                formErrorMessages = {formErrorMessages}
              />
              <RangeInput
                name="Fat"
                handleChange ={handleChange}
                values = {[request.FatMax,request.FatMin]}
                formErrorMessages = {formErrorMessages}
              />
              <RangeInput
                name="Protein"
                handleChange ={handleChange}
                values = {[request.ProteinMax,request.ProteinMin]}
                formErrorMessages = {formErrorMessages}
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