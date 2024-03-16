import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validateEmail from "../../utils/validate-email";
import { registerUser } from "../../use-cases/register-user";
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getDisabledReg } from "../../use-cases/get-disabled-reg";
import { Report } from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const userData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  ComfirmPassword:"",
  userRef: ""
};

export default function SignUp() {
  const [isRegDisabled, setIsRegDisabled] = React.useState(false);
  const [formData, setFormData] = React.useState({ ...userData });
  const [formErrorMessages, setFormErrorMessages] = React.useState({
    ...userData,
  });
  const [isDialogBoxOpen, setIsDialogBoxOpen] = React.useState(false);
  const [queryParameters] = useSearchParams();
  // const queryParameters = new URLSearchParams(window.location.search);
 const MySwal = withReactContent(Swal);
  React.useEffect(() => {
    const ref = queryParameters.get("ref");
    if (ref) {
      setFormData((prev) => ({ ...prev, userRef: ref }));
    }

    getDisabledReg().then((response) => {
      if (response.data.value === "TRUE") {
        setIsRegDisabled(true);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = false;
    let errorMessages = { ...userData };

    if (formData.firstName.trim() === "") {
      errorMessages.firstName = "First Name is required";
      errors = true;
    }

    if (formData.lastName.trim() === "") {
      errorMessages.lastName = "Last Name is required";
      errors = true;
    }

    if (formData.email.trim() === "") {
      errorMessages.email = "Email is required";
      errors = true;
    }

    if (formData.email.trim() !== "" && !validateEmail(formData.email.trim())) {
      errorMessages.email = "Email is not valid";
      errors = true;
    }

    if (formData.password.trim() === "") {
      errorMessages.password = "Password is required";
      errors = true;
    }
    if (formData.ComfirmPassword.trim() === "") {
      errorMessages.ComfirmPassword = "Comfirm Password is required";
      errors = true;
    } else if (formData.ComfirmPassword.trim() !== formData.password.trim()) {
      errorMessages.ComfirmPassword =
        "Confirm Password is not match with Password";
      errors = true;
    }

    if (errors) {
      setFormErrorMessages(errorMessages);
      return;
    }

    const requestData = { ...formData, userRef: undefined };

    if (formData.userRef !== "") {
      requestData.parentRef = formData.userRef;
    }

    registerUser(requestData)
      .then((response) => {
        MySwal.fire(
          "Good job!",
          "Please verify your email using the link we sent to your email",
          "success"
        );
        setFormData({ ...userData });
      })
      .catch((error) => {
        if (error?.response?.data) {
          setFormErrorMessages((prev) => {
            const newErrors = { ...prev };
            Object.keys(error.response.data).forEach((key) => {
              newErrors[key] = error.response.data[key];
            });
            MySwal.fire("ERROR!", "Somthing Went Wrong", "error");
            return newErrors;
          });
        }
      });
  };

  const handleFormValueChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    setFormErrorMessages((prev) => ({
      ...prev,
      [event.target.name]: "",
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid grey",
          paddingTop:1,
          padding: 3,
          backgroundColor: "black",
          borderRadius: "10px"
        }}
      >
        <Avatar
          sx={{width: 100, height: 100 }}
          alt="Remy Sharp"
          src="logo.jpg"
        >
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {isRegDisabled && (
          <Alert color="error" icon={<Report />}>
            New Registrations are hold for now!
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={handleFormValueChange}
                error={formErrorMessages.firstName !== ""}
                helperText={formErrorMessages.firstName}
                color="secondary"
                disabled={isRegDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleFormValueChange}
                error={formErrorMessages.lastName !== ""}
                helperText={formErrorMessages.lastName}
                color="secondary"
                disabled={isRegDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleFormValueChange}
                error={formErrorMessages.email !== ""}
                helperText={formErrorMessages.email}
                color="secondary"
                disabled={isRegDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleFormValueChange}
                error={formErrorMessages.password !== ""}
                helperText={formErrorMessages.password}
                color="secondary"
                disabled={isRegDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="ComfirmPassword"
                label="Comfirm Password"
                type="password"
                id="Comfirm password"
                autoComplete="new-password"
                value={formData.ComfirmPassword}
                onChange={handleFormValueChange}
                error={formErrorMessages.ComfirmPassword !== ""}
                helperText={formErrorMessages.ComfirmPassword}
                color="secondary"
                disabled={isRegDisabled}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="userRef"
                label="Referral"
                name="userRef"
                value={formData.userRef}
                onChange={handleFormValueChange}
                error={formErrorMessages.userRef !== ""}
                helperText={formErrorMessages.userRef}
                color="secondary"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isRegDisabled}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2" color="#fff">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
