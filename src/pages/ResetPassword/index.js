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
    const gymID = queryParameters.get("n")
    formData.gymID = gymID;
  },[])


  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = false;
    let errorMessages = { ...userData };

    if (formData.confirmPassword.trim() === "") {
      errorMessages.confirmPassword = "Confirm Password is required";
      errors = true;
    }else if(formData.password.trim() !== formData.confirmPassword.trim()){
        errorMessages.confirmPassword = "Confirm Password is mismatched";
        errors = true;
    }
    if (formData.password.trim() === "") {
      errorMessages.password = "Password is required";
      errors = true;
    }else{
      {
        let validation = validatePassword(formData.password)
        if(validation !== null){
          errorMessages.password = validation;
          errors = true;
        }
      }
    }
    if (errors) {
      setFormErrorMessages(errorMessages);
      return;
    }

    resetPassword(formData)
    .then((response) => {
      console.log(response)
      if(response.data == "Success"){
        MySwal.fire("success!", "Password has been changed", "success")
        navigate("/login");
      }else{
        MySwal.fire("Error!",response.data, "error")
      }

    })
    .catch((error) => {
      setShowErrorMessage(true)
    });

  }
  function validatePassword(password) {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[@$!%*?&]/;

    if(!uppercaseRegex.test(password)){
      return "At least one uppercase letter" 
    }else if(!lowercaseRegex.test(password)){
      return "At least one lowercase letter "
    }else if(!digitRegex.test(password)){
      return "At least one digit"
    }else if(!specialCharRegex.test(password)){
      return "At least one special character"
    }else if(formData.password.length < 8){
      return "Password at least 8 characters";
    }else{
      return null;
    }
  };
  

    console.log(formData)




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
        <Typography component="h1" variant="h3" color="#fff">
          <strong>Reset Password</strong>
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
            placeholder ="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleFormValueChange}
            error={formErrorMessages.password}
            helperText={formErrorMessages.password}
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
            id="confirmPassword"
            placeholder ="Confirm Password"
            name="confirmPassword"
            autoComplete="confirmPassword"
            autoFocus
            value={formData.confirmPassword}
            onChange={handleFormValueChange}
            error={formErrorMessages.confirmPassword !== ""}
            helperText={formErrorMessages.confirmPassword}
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
            sx={{ mt: 3, mb: 2, borderRadius: "20px",p:2,fontSize:"20px"}}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
