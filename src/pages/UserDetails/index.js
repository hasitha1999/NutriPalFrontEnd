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
} from "@mui/material";
import { getUserDetails } from "../../use-cases/get-user-details";
import { editUser } from "../../use-cases/edit-user";
import { Label } from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UserDetails = () => {
  
  const [user, setUser] = useState({});
  const MySwal = withReactContent(Swal);
  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    getUserDetails().then((res) => setUser(res.data));
  }, []);

  // const handleSubmit =
  //   ((event) => {
  //     event.preventDefault();
  //   },
  //   []);
console.log(user);
  const save = () => {
    editUser(user).then(()=>{MySwal.fire("success!", "Profile information update successful....!", "success");}).catch(()=>{
       MySwal.fire("ERROR", "Please contact admin", "error");
    });
    console.log(user)
  };

  return (
    <Card  sx={{m:2,
      borderRadius: 3,
      border: "1px solid #000",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      mt:3}}>
      <CardHeader title="Profile Update" sx={{ml:2 }} />
      <Typography variant="h5" color={"GrayText"} gutterBottom sx={{ml:2}}>
        Genaral Informations
      </Typography>
      <CardContent sx={{ pt: 0 }}>
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
              <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
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
  );
};

export default UserDetails;
