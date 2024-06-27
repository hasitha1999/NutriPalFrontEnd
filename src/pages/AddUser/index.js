import {
    Avatar,
    Box,
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    LinearProgress,
    MenuItem,
    Radio,
    RadioGroup,
    Typography,
  } from "@mui/material";
  import {
    getAllergiesDetails,
    getUserDetails,
  } from "../../use-cases/get-user-details";
  import { useEffect, useState } from "react";
  import { editUser } from "../../use-cases/edit-user";
  import withReactContent from "sweetalert2-react-content";
  import Swal from "sweetalert2";
  import { CustomTextField } from "../../component-ui/CustomTextField/CustomTextField";
  import { CustomSelect } from "../../component-ui/CustomSelect/index";
  import { useNavigate } from "react-router-dom";
  
  const emptyUserObject = {
    firstName: "",
    lastName: "",
    gymID: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    height: "",
    weight: "",
    activeLevel: "",
    goal: "",
  };
  
  const AddUser = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
  
    const [user, setUser] = useState({ ...emptyUserObject });
    const [userErrors, setUserErrors] = useState({ ...emptyUserObject });
    const [allAllergies, setAllAllergies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const dobMaxDate = new Date();
    dobMaxDate.setFullYear(dobMaxDate.getFullYear() - 15);
  
    const dobMinDate = new Date();
    dobMinDate.setFullYear(dobMinDate.getFullYear() - 100);
  
    const handleChange = (event) => {
      const isNum =
        event.target.name === "weight" ||
        event.target.name === "height" ||
        event.target.name === "activeLevel";
      setUser((prevState) => ({
        ...prevState,
        [event.target.name]: isNum
          ? parseInt(event.target.value)
          : event.target.value,
      }));
      setUserErrors((prev) => ({
        ...prev,
        [event.target.name]: "",
      }));
    };
  
    const save = () => {
      if (!validateUser()) {
        return;
      }
  
      if (!user.gymID) {
        user.gymID = user.gymID;
      }
  
      setIsLoading(true);
  
      editUser(user)
        .then(() => {
          setUser({ ...emptyUserObject });
          setUserErrors({ ...emptyUserObject });
          setIsLoading(false);
          MySwal.fire(
            "success!",
            "Profile information update successful....!",
            "success"
          );
        })
        .catch((e) => {
          setIsLoading(false);
          if(e.response?.data?.cause?.cause?.message?.includes(user.email)) {
            setUserErrors(prev => ({
              ...prev,
              email: 'Already Exists in the system!'
            }))
          } else if(e.response?.data?.cause?.cause?.message?.includes(user.gymID)) {
            setUserErrors(prev => ({
              ...prev,
              gymID: 'Already Exists in the system!'
            }))
          } else {
            MySwal.fire("ERROR", "Please contact admin", "error");
          }
        });
    };
  
    const handleCancel = () => {
      navigate("/users");
    };
  
    const validateUser = () => {
      let isValidate = true;
      const errors = { ...emptyUserObject };
  
      if (user.firstName.trim() === "") {
        errors.firstName = "Cannot be Empty!";
        isValidate = false;
      }
  
      if (user.lastName.trim() === "") {
        errors.lastName = "Cannot be Empty!";
        isValidate = false;
      }
  
      if (user.gymID.trim() === "") {
        errors.gymID = "Cannot be Empty!";
        isValidate = false;
      }
  
      if (user.dob.trim() === "") {
        errors.dob = "Cannot be Empty!";
        isValidate = false;
      }
  
      if (user.gender.trim() === "") {
        errors.gender = "Select one!";
        isValidate = false;
      }
  
      if (user.email.trim() === "") {
        errors.email = "Cannot be Empty!";
        isValidate = false;
      } else if (!/^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/.test(user.email)) {
        errors.email = "Invalid Format!";
        isValidate = false;
      }
  
      if (user.height === "") {
        errors.height = "Cannot be Empty!";
        isValidate = false;
      } else if (user.height < 50) {
        errors.height = "Must be at lease 50cm";
        isValidate = false;
      }
  
      if (user.weight === "") {
        errors.weight = "Cannot be Empty!";
        isValidate = false;
      } else if (user.weight < 20) {
        errors.weight = "Must be at lease 20kg";
        isValidate = false;
      }
  
      if (user.activeLevel === "") {
        errors.activeLevel = "Cannot be Empty!";
        isValidate = false;
      }
  
      if (user.goal.trim() === "") {
        errors.goal = "Cannot be Empty!";
        isValidate = false;
      }
  
      setUserErrors(errors);
  
      return isValidate;
    };
  
    return (
      <Card sx={{ p: 2 }} elevation={4}>
        <Box display="flex" alignItems={"center"}>
          <Typography variant="h4">New User</Typography>
        </Box>
        {isLoading && (
          <Box>
            <LinearProgress />
          </Box>
        )}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="firstName"
                mb="5px"
              >
                First Name
              </Typography>
              <CustomTextField
                type="text"
                variant="outlined"
                fullWidth
                name="firstName"
                placeholder="First Name"
                required
                disabled={isLoading}
                value={user.firstName}
                onChange={handleChange}
                error={userErrors.firstName}
                helperText={userErrors.firstName}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="gymID"
                mb="5px"
              >
                GYM ID
              </Typography>
              <CustomTextField
                type="text"
                variant="outlined"
                fullWidth
                name="gymID"
                placeholder="GYM ID"
                required
                disabled={isLoading}
                value={user.gymID}
                onChange={handleChange}
                error={userErrors.gymID}
                helperText={userErrors.gymID}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="gymID"
                mb="5px"
              >
                Gender
              </Typography>
              <FormControl fullWidth style={{ marginTop: 2, marginBottom: 2 }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  onChange={handleChange}
                  value={user?.gender || ""}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    color="secondary"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    color="secondary"
                  />
                </RadioGroup>
                <FormHelperText error={userErrors.gender}>
                  {userErrors.gender}
                </FormHelperText>
              </FormControl>
            </Box>
            <Box mt="32px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="phone"
                mb="5px"
              >
                Phone
              </Typography>
              <CustomTextField
                type="text"
                variant="outlined"
                fullWidth
                name="phone"
                placeholder="Phone"
                required
                disabled={isLoading}
                value={user.phone}
                onChange={handleChange}
                error={userErrors.phone}
                helperText={userErrors.phone}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="weight"
                mb="5px"
              >
                Weight(kg)
              </Typography>
              <CustomTextField
                type="number"
                variant="outlined"
                fullWidth
                name="weight"
                placeholder="Weight"
                required
                disabled={isLoading}
                value={user.weight}
                onChange={handleChange}
                error={userErrors.weight}
                helperText={userErrors.weight}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="goal"
                mb="5px"
              >
                Goal
              </Typography>
              <FormControl fullWidth>
                <CustomSelect
                  name="goal"
                  onChange={handleChange}
                  value={user.goal || ""}
                  disabled={isLoading}
                  error={userErrors.goal}
                >
                  <MenuItem value={"10"}>Weight Loss</MenuItem>
                  <MenuItem value={"20"}>Muscle Building (Bulking)</MenuItem>
                  <MenuItem value={"30"}>Muscle Toning</MenuItem>
                  <MenuItem value={"40"}>Increasing Strength</MenuItem>
                  <MenuItem value={"50"}>
                    Rehabilitation and Injury Recovery
                  </MenuItem>
                </CustomSelect>
                <FormHelperText error={userErrors.goal}>
                  {userErrors.goal}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="password"
                mb="5px"
              >
                Last Name
              </Typography>
              <CustomTextField
                type="text"
                variant="outlined"
                fullWidth
                name="lastName"
                placeholder="Last Name"
                required
                disabled={isLoading}
                value={user.lastName}
                onChange={handleChange}
                error={userErrors.lastName}
                helperText={userErrors.lastName}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="dob"
                mb="5px"
              >
                Date of Birth
              </Typography>
              <CustomTextField
                type="date"
                variant="outlined"
                fullWidth
                name="dob"
                placeholder="Date of Birth"
                required
                disabled={isLoading}
                value={user.dob}
                onChange={handleChange}
                error={userErrors.dob}
                helperText={userErrors.dob}
                inputProps={{
                  min: dobMinDate.toISOString().substring(0, 10),
                  max: dobMaxDate.toISOString().substring(0, 10),
                }}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="email"
                mb="5px"
              >
                E-mail
              </Typography>
              <CustomTextField
                type="email"
                variant="outlined"
                fullWidth
                name="email"
                placeholder="E-mail"
                required
                disabled={isLoading}
                value={user.email}
                onChange={handleChange}
                error={userErrors.email}
                helperText={userErrors.email}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="height"
                mb="5px"
              >
                Height(cm)
              </Typography>
              <CustomTextField
                type="number"
                variant="outlined"
                fullWidth
                name="height"
                placeholder="Height"
                required
                disabled={isLoading}
                value={user.height}
                onChange={handleChange}
                error={userErrors.height}
                helperText={userErrors.height}
              />
            </Box>
            <Box mt="25px">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="activeLevel"
                mb="5px"
              >
                Active Level
              </Typography>
              <FormControl fullWidth>
                <CustomSelect
                  name="activeLevel"
                  onChange={handleChange}
                  value={user.activeLevel || ""}
                  disabled={isLoading}
                  error={userErrors.activeLevel}
                >
                  <MenuItem value={1}>Level 1</MenuItem>
                  <MenuItem value={2}>Level 2</MenuItem>
                  <MenuItem value={3}>Level 3</MenuItem>
                  <MenuItem value={4}>Level 4</MenuItem>
                </CustomSelect>
                <FormHelperText error={userErrors.activeLevel}>
                  {userErrors.activeLevel}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={save} disabled={isLoading}>
              Save
            </Button>
            <Button variant="text" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    );
  };
  
  export default AddUser;
  