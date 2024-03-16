import React, { useEffect, useState } from "react";
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
    <Card>
      <CardHeader title="Profile" />
      <Typography variant="h5" color={"GrayText"} gutterBottom marginLeft={"3"}>
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
            <Grid xs={12} md={6}>
              Gender
              <TextField
                fullWidth
                // label="First name"
                name="gender"
                onChange={handleChange}
                required
                value={user.gender}
              />
            </Grid>
            <Grid xs={12} md={6}>
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
            <Grid xs={12} md={6}>
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
            <Grid xs={12} md={6}>
              E-mail
              <TextField
                fullWidth
                // label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
              />
            </Grid>
            <Grid xs={12} md={12}>
              <Typography variant="h5" color={"GrayText"} gutterBottom>
                Address Informations
              </Typography>
            </Grid>
            <Grid xs={12} md={12}>
              Address
              <TextField
                fullWidth
                multiline
                rows={4}
                // label="Email Address"
                name="address"
                onChange={handleChange}
                required
                value={user.address}
              />
            </Grid>
            <Grid xs={12} md={6}>
              City
              <TextField
                fullWidth
                // label="Email Address"
                name="city"
                onChange={handleChange}
                required
                value={user.city}
              />
            </Grid>
            <Grid xs={12} md={6}>
              Zip Code
              <TextField
                fullWidth
                // label="Email Address"
                name="zipCode"
                onChange={handleChange}
                required
                value={user.zipCode}
              />
            </Grid>
            <Grid xs={12} md={6}>
              Country
              <TextField
                fullWidth
                // label="Email Address"
                name="country"
                onChange={handleChange}
                required
                value={user.country}
              />
            </Grid>
            <Grid xs={12} md={6}></Grid>

            <Grid xs={12} md={6}>
              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
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
