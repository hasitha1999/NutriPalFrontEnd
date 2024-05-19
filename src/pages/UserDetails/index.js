import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { getUserDetails } from "../../use-cases/get-user-details";
import { editUser } from "../../use-cases/edit-user";
import { Label } from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UserDetails = () => {
  
  const [user, setUser] = useState({});
  const MySwal = withReactContent(Swal);
  const [selectedNCD,setSelectedNCD] = useState([6]);
  const [selectedAllergies,setSelectedAllergies] = useState([6]);

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleNCDClick =(event) => {
    let selectedNCDlist = selectedNCD;
    if(selectedNCD.includes(parseInt(event.target.name))){
      selectedNCDlist.splice(selectedNCDlist.indexOf(parseInt(event.target.name)),1);
    }else{
      selectedNCDlist.push(parseInt(event.target.name));
    }
    setSelectedNCD(selectedNCDlist);
  }


  const handleAllergyClick =(event) => {
    let selectedAllergieslist = selectedAllergies;
    if(selectedAllergies.includes(parseInt(event.target.name))){
      selectedAllergieslist.splice(selectedAllergieslist.indexOf(parseInt(event.target.name)),1);
    }else{
      selectedAllergieslist.push(parseInt(event.target.name));
    }
    setSelectedAllergies(selectedAllergieslist);
  }

  const ncdList = [
    "Cardiovascular disease",
    "Cancer",
    "Chronic respiratory disease",
    "Diabetes",
    "Arthritis",
    "Hypertension"
  ]
  const allergies = ["Peanuts", "Tree nuts", "Shellfish", "Fish", "Eggs", "Milk", "Wheat", "Soy", "Sesame", "Mustard", "Sulfites", "Corn", "Gluten", "Celery"]
  const [profileInfo,setProfileInfo] = useState({weight:85,height:180,gender:1,activeLevel:2,goal:"Weight Loss",firstName:"Hasitha",lastName:"Lakmal",useId:"1560",email:"hasithalakmal@gmail.com",dob:"1999/06/17",allergies:["Peanuts", "Tree nuts", "Shellfish", "Fish", "Eggs", "Milk", "Wheat", "Soy", "Sesame", "Mustard", "Sulfites", "Corn", "Gluten", "Celery"],
ncd:["Diabetes","Arthritis"]});
  useEffect(() => {
    // getUserDetails().then((res) => setUser(res.data));
  }, []);

  // const handleSubmit =
  //   ((event) => {
  //     event.preventDefault();
  //   },
  //   []);
console.log(user);
  const save = () => {
    user.nsdList = selectedNCD;
    editUser(user).then(()=>{MySwal.fire("success!", "Profile information update successful....!", "success");}).catch((e)=>{
      alert(e)
      //  MySwal.fire("ERROR", "Please contact admin", "error");
    });
    console.log(user)
  };

  return (
    <>
    <Card  sx={{m:2,
      borderRadius: 3,
      border: "1px solid #000",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      mt:3}}>
      <CardHeader title="Profile Update" sx={{ml:2 }} />
      <CardContent sx={{ pt: 0 }}>
      <Typography variant="h5" color={"GrayText"} gutterBottom sx={{ml:2}}>
        Genaral Informations
      </Typography>
        <Box sx={{ mb: 5 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              First name
              <TextField
                fullWidth
                name="firstName"
                onChange={handleChange}
                required
                value={user.firstName}
              />
            </Grid>
            <Grid xs={12} md={6}>
              Last name
              <TextField
                fullWidth
                name="lastName"
                onChange={handleChange}
                required
                value={user.lastName}
              />
            </Grid>
            <Grid xs={6} md={3}>
            <FormControl>
              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                onChange={handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" color="secondary" />
                <FormControlLabel value="male" control={<Radio />} label="Male" color="secondary" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            </Grid>
            <Grid xs={6} md={3}>
              Date Of Birth
              <TextField
                fullWidth
                // label="Last name"
                name="dob"
                onChange={handleChange}
                required
                value={user.dob}
              />
            </Grid>
            <Grid xs={12} md={3}>
              phone
              <TextField
                fullWidth
                // label="First name"
                name="phone"
                onChange={handleChange}
                required
                value={user.phone}
              />
            </Grid>
            <Grid xs={12} md={3}>
              E-mail
              <TextField
                fullWidth
                // label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
              > <input type="email" /></TextField>
            </Grid>
            <Grid xs={12} md={3}>
              Weight
              <TextField
                fullWidth
                name="weight"
                onChange={handleChange}
                required
                value={user.weight}
              />
            </Grid>
            <Grid xs={12} md={3}>
              Height
              <TextField
                fullWidth
                name="height"
                onChange={handleChange}
                required
                value={user.height}
              />
            </Grid>
            <Grid xs={12} md={3}>
            <FormControl fullWidth>
                Goal
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="goal"
                  label="goal"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <hr></hr>
        <Box>
        <Typography variant="h5" color={"GrayText"} gutterBottom sx={{ml:2}} >
                Noncommunicable Diseases  
              </Typography>
              <Divider />
              <FormGroup>

              <Grid container>
                {ncdList.map((disease,index)=>(
                    <Grid item xs={6} md={6}>
                      <FormControlLabel control={<Checkbox/>} label={disease} name={index} onChange={handleNCDClick}/>
                    </Grid>
                ))}
                </Grid>
              </FormGroup>
        </Box>
        <hr></hr>
        <Box>
        <Typography variant="h5" color={"GrayText"} gutterBottom sx={{ml:2}} >
              Food Allergy 
              </Typography>
              <Divider />
              <FormGroup>

              <Grid container>
                {allergies.map((allergy,index)=>(
                    <Grid item xs={6} md={6}>
                      <FormControlLabel control={<Checkbox/>} label={allergy} name={index} onChange={handleAllergyClick}/>
                    </Grid>
                ))}
                </Grid>
              </FormGroup>
          <Grid container spacing={3}>
            <Grid xs={12} md={12}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center">
              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
                  color="secondary"
                  value="50"
                  onClick={save}
                >
                  Save details
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Box>

      </CardContent>
    </Card>

    </>
  );
};

export default UserDetails;
