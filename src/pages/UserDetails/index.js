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
import { getAllergiesDetails, getUserDetails } from "../../use-cases/get-user-details";
import { editUser } from "../../use-cases/edit-user";
import { Label } from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserDetails = () => {
  
  const [user, setUser] = useState({});
  const MySwal = withReactContent(Swal);
  const [allAllergies,setAllAllergies] = useState([]);
  const [selectedAllergies,setSelectedAllergies] = useState([]);
  const [isUpdate,setIsUpdate] = useState(false);

  const [queryParameters] = useSearchParams();

  useEffect(() => {
    const isUpdate = queryParameters.get("isUpdate")
    // console.log(isUpdate);
    if(isUpdate == "true"){
      setIsUpdate(true);
      getUserDetails().then((res) => {setUser(res.data);setSelectedAllergies(res.data.allergy);});
    }
    getAllergiesDetails().then((res)=>setAllAllergies(res.data));
    
  }, []);

  console.log(user)
  
  useEffect(()=>{},[selectedAllergies])

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };


  const handleAllergyClick =(event) => {
    setSelectedAllergies(prev => {
      let newState = [...prev];

      const index = newState.findIndex(a=> a.allergyId == parseInt(event.target.value));

      if(index === -1) {
        newState.push({allergyId:parseInt(event.target.value),allergyName:event.target.name});
      } else {
        newState.splice(index,1);
      }

      return newState;
    })
  }

  const save = () => {
    user.allergy = selectedAllergies;
    if(!user.gymID){
      user.gymID =user.gymID;
    }
    
    editUser(user).then(()=>{MySwal.fire("success!", "Profile information update successful....!", "success");}).catch((e)=>{
      // alert(e)
       MySwal.fire("ERROR", "Please contact admin", "error");
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
            <Grid xs={12} md={3}>
              First name
              <TextField
                fullWidth
                name="firstName"
                onChange={handleChange}
                required
                value={user.firstName}
              />
            </Grid>
            <Grid xs={12} md={3}>
              Last name
              <TextField
                fullWidth
                name="lastName"
                onChange={handleChange}
                required
                value={user.lastName}
              />
            </Grid>
            <Grid xs={12} md={3}>
             Gym ID
              <TextField
                fullWidth
                name="gymID"
                onChange={handleChange}
                required
                value={user.gymID}
                disabled={isUpdate}
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
                value={user?.gender || ''}
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
                name="dob"
                onChange={handleChange}
                placeholder="YYYY/MM/DD"
                required
                value={user.dob}
              />
            </Grid>
            <Grid xs={12} md={3}>
              phone
              <TextField
                fullWidth
                name="phone"
                onChange={handleChange}
                required
                value={user.phone}
                
                inputProps={{ maxLength: 10,type:"number"}}
              />
            </Grid>
            <Grid xs={12} md={3}>
              E-mail
              <TextField
                fullWidth
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
                  name="goal"
                  label="goal"
                  onChange={handleChange}
                  value={user.goal|| ''}
                >
                  <MenuItem value={"10"}>Weight Loss</MenuItem>
                  <MenuItem value={"20"}>Muscle Building (Bulking)</MenuItem>
                  <MenuItem value={"30"}>Muscle Toning</MenuItem> 
                  <MenuItem value={"40"}>Increasing Strength</MenuItem>
                  <MenuItem value={"50"}>Rehabilitation and Injury Recovery</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={3}>
            <FormControl fullWidth>
                Active Level
                <Select
                  name="activeLevel"
                  label="activeLevel"
                  onChange={handleChange}
                  value={user.activeLevel|| ''}
                >
                  <MenuItem value={1}>Level 1</MenuItem>
                  <MenuItem value={2}>Level 2</MenuItem>
                  <MenuItem value={3}>Level 3</MenuItem> 
                  <MenuItem value={4}>Level 4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <hr></hr>
        <Box>
        <Typography variant="h5" color={"GrayText"} gutterBottom sx={{ml:2}} >
              Food Allergy 
              </Typography>
              <Divider />
              <FormGroup>

              <Grid container>
                {allAllergies.map((allergy,index)=>{
                  return (
                    <Grid item xs={6} md={6}>
                      <FormControlLabel control={<Checkbox checked={selectedAllergies.find(a=> a.allergyId == allergy.allergyId) !== undefined} onChange={handleAllergyClick}/>} label={allergy.allergyName} name={allergy.allergyName} value={allergy.allergyId} />
                    </Grid>
                )})}
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
