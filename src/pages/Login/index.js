import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { loginUser } from "../../use-cases/login-user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert } from "@mui/material";
import { Report } from "@mui/icons-material";

const userData = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formData, setFormData] = React.useState({ ...userData });
  const [formErrorMessages, setFormErrorMessages] = React.useState({
    ...userData,
  });
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [commonError, setCommonError] = React.useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const error = searchParams.get("error")
    if(error) {
      if(error === 'session-expired') {
        setCommonError('Session Expired')
      }
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = false;
    let errorMessages = { ...userData };

    if (formData.email.trim() === "") {
      errorMessages.email = "Email is required";
      errors = true;
    }

    if (formData.password.trim() === "") {
      errorMessages.password = "Password is required";
      errors = true;
    }

    if (errors) {
      return;
    }

    loginUser(formData)
      .then((response) => {
        window.sessionStorage.setItem("TOKEN", response.data.token);
        window.sessionStorage.setItem("ROLE", response.data.role);
        navigate("/home");
      })
      .catch((error) => {
        setShowErrorMessage(true)
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
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid grey",
          paddingTop: 1,
          padding: 3,
          backgroundColor: "black",
          borderRadius: "10px",
        }}
      >
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Remy Sharp"
          src="logo.jpg"
        ></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {showErrorMessage && (
          <Alert
            color="error"
            icon={<Report />}
            onClose={() => setShowErrorMessage(false)}
          >
            Invalid Username or Password
          </Alert>
        )}
        {commonError && (
          <Alert
            color="error"
            icon={<Report />}
            onClose={() => setCommonError("")}
          >
            {commonError}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleFormValueChange}
            error={formErrorMessages.email !== ""}
            helperText={formErrorMessages.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleFormValueChange}
            error={formErrorMessages.password !== ""}
            helperText={formErrorMessages.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item >
              <Link href="#" variant="body2" color="#fff">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" color="#fff">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
