import { Report } from "@mui/icons-material";
import { Alert, Card, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Logo from "../../component-content/Layout/Logo";
import { resetPassword } from "../../use-cases/login-user";
import { CustomTextField } from "../../component-ui/CustomTextField/CustomTextField";


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
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
      component={"form"}
      onSubmit={handleSubmit}
      noValidate
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Logo />
            </Box>

            <Box>
              {showErrorMessage && (
                <Alert
                  sx={{ display: "flex", alignItems: "center" }}
                  color="error"
                  icon={<Report />}
                  onClose={() => setShowErrorMessage(false)}
                >
                  Invalid Password
                </Alert>
              )}
              {commonError && (
                <Alert
                  sx={{ display: "flex", alignItems: "center" }}
                  color="error"
                  icon={<Report />}
                  onClose={() => setCommonError("")}
                >
                  {commonError}
                </Alert>
              )}
            </Box>

            <Stack>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="username"
                  mb="5px"
                >
                  New Password
                </Typography>
                <CustomTextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={handleFormValueChange}
                  error={formErrorMessages.password !== ""}
                  helperText={formErrorMessages.password}
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                />
              </Box>
              <Box mt="25px">
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                >
                  Confirm New Password
                </Typography>
                <CustomTextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleFormValueChange}
                  error={formErrorMessages.confirmPassword !== ""}
                  helperText={formErrorMessages.confirmPassword}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  autoComplete="confirmPassword"
                  required
                />
              </Box>
            </Stack>
            <Box mt={2}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
              >
                Reset Password
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
