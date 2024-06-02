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
import { getforgotPassword, loginUser, resetPassword } from "../../use-cases/login-user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert } from "@mui/material";
import { Report } from "@mui/icons-material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const userData = {
    confirmPassword: "",
  password: "",
};

export default function ResetPassword() {
  const [formData, setFormData] = React.useState({ ...userData });
  const [formErrorMessages, setFormErrorMessages] = React.useState({
    ...userData,
  });
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [commonError, setCommonError] = React.useState('');
  const MySwal = withReactContent(Swal);
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  React.useEffect(()=>{
    const userName = queryParameters.get("n")
    formData.userName = userName;
  },[])


  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = false;
    let errorMessages = { ...userData };

    if (formData.confirmPassword.trim() === "") {
      errorMessages.userName = "Confirm Password is required";
      errors = true;
    }else if(formData.password.trim() !== formData.confirmPassword.trim()){
        errorMessages.userName = "Confirm Password is mismatched";
        errors = true;
    }

    if (formData.password.trim() === "") {
      errorMessages.password = "Password is required";
      errors = true;
    }

    

    if (errors) {
      return;
    }

    console.log(formData)


    resetPassword(formData)
      .then((response) => {
        MySwal.fire("success!", "Password has been changed", "success")
        navigate("/login");
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
    <Container component="main" maxWidth="xs" >
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
          borderRadius: "10px",
        }}
      >
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt="Remy Sharp"
          src="logo.jpg"
        ></Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {showErrorMessage && (
          <Alert
            color="error"
            icon={<Report />}
            onClose={() => setShowErrorMessage(false)}
          >
            Invalid Password
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleFormValueChange}
            error={formErrorMessages.password}
            helperText={formErrorMessages.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="confirmPassword"
            autoFocus
            value={formData.confirmPassword}
            onChange={handleFormValueChange}
            error={formErrorMessages.confirmPassword !== ""}
            helperText={formErrorMessages.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
