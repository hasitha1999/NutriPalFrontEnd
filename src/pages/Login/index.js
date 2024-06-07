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
import { getforgotPassword, loginUser } from "../../use-cases/login-user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert } from "@mui/material";
import { Report } from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const userData = {
  gymID: "",
  password: "",
};

export default function SignIn() {
  const [formData, setFormData] = React.useState({ ...userData });
  const [formErrorMessages, setFormErrorMessages] = React.useState({
    ...userData,
  });
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [commonError, setCommonError] = React.useState('');
  const MySwal = withReactContent(Swal);
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

    if (formData.gymID.trim() === "") {
      errorMessages.gymID = "Gym ID is required";
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
  const forgotPassword = () => {
    if (formData.gymID.trim() === "") {
      MySwal.fire("ERROR", "Gym ID is required", "error");
    }else{
      getforgotPassword(formData).then((response) => {
        MySwal.fire("success!", "Password reset process will recived via email", "success")
      }
        
      )
    }

  }

  return (
    <Container component="main"  >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 1,
          padding: 3,
          borderRadius: "10px",
        }}
      >
       <Avatar
          sx={{ width: 200, height: 200 }}
          alt="Remy Sharp"
          src="logo.png"
        ></Avatar>
        <Typography component="h1" variant="h2" color="#fff">
        <strong>Nutri-Pal</strong>
        </Typography>
        {showErrorMessage && (
          <Alert
            color="error"
            icon={<Report />}
            onClose={() => setShowErrorMessage(false)}
          >
            Invalid Gym ID or Password
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            hiddenLabel
            id="gymID"
            label="Gym ID"
            name="gymID"
            autoComplete="gymID"
            autoFocus
            value={formData.gymID}
            onChange={handleFormValueChange}
            error={formErrorMessages.gymID !== ""}
            helperText={formErrorMessages.gymID}
            InputProps={{
              style: {
                borderRadius: "20px",
                border: "1px solid white",
              }
            }}
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
            InputProps={{
              style: {
                borderRadius: "20px",
                border: "1px solid white",
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,borderRadius: "20px",p:2,fontSize:"20px"}}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item >
              <Link variant="body2" color="#fff" onClick={forgotPassword}>
                Forgot password? Click Here
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
