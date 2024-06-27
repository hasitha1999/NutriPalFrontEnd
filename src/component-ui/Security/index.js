import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { CustomTextField } from "../../component-ui/CustomTextField/CustomTextField";
import { changePassword } from "../../use-cases/change-password";

const passwordObject = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const Security = () => {
  const MySwal = withReactContent(Swal);

  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({ ...passwordObject });
  const [errors, setErrors] = useState({ ...passwordObject });

  const handleChange = (event) => {
    setPasswords((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [event.target.name]: "",
    }));
  };

  const save = () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);

    changePassword({
      password: passwords.password,
      currentPassword: passwords.currentPassword,
    })
      .then((res) => {
        if(res.data === 'success') {
          setPasswords({ ...passwordObject });
          MySwal.fire("success!", "Password has been changed", "success")
        } else {
          setErrors(prev => ({
            ...prev,
            currentPassword: "Current Password is Invalid!",
          }))
        }
        setIsLoading(false);
      })
      .catch(() => {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Current Password is Invalid!",
        }));
        setIsLoading(false);
      });
  };

  const validate = () => {
    let isValid = true;
    const passwordErrors = { ...passwordObject };

    if (passwords.currentPassword.trim() === "") {
      passwordErrors.currentPassword = "Cannot be Empty!";
      isValid = false;
    }

    if (passwords.password.trim() === "") {
      passwordErrors.password = "Cannot be Empty!";
      isValid = false;
    }

    if (passwords.confirmPassword.trim() === "") {
      passwordErrors.confirmPassword = "Cannot be Empty!";
      isValid = false;
    } else if (passwords.confirmPassword !== passwords.password) {
      passwordErrors.confirmPassword = "Passwords are Not Match!";
      passwordErrors.password = "Passwords are Not Match!";
      isValid = false;
    }

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[@$!%*?&]/;

    if (!uppercaseRegex.test(passwords.password)) {
      passwordErrors.password = "At least one uppercase letter";
      isValid = false;
    } else if (!lowercaseRegex.test(passwords.password)) {
      passwordErrors.password = "At least one lowercase letter ";
      isValid = false;
    } else if (!digitRegex.test(passwords.password)) {
      passwordErrors.password = "At least one digit";
      isValid = false;
    } else if (!specialCharRegex.test(passwords.password)) {
      passwordErrors.password = "At least one special character";
      isValid = false;
    } else if (passwords.password.length < 8) {
      passwordErrors.password = "Password at least 8 characters";
      isValid = false;
    }

    setErrors(passwordErrors);

    return isValid;
  };

  return (
    <Card sx={{ p: 2 }} elevation={4}>
      <Box>
        <Typography variant="h4">Change Password </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="currentPassword"
              mb="5px"
            >
              Current Password
            </Typography>
            <CustomTextField
              type="password"
              variant="outlined"
              fullWidth
              name="currentPassword"
              placeholder="Current Password"
              required
              disabled={isLoading}
              value={passwords.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
              helperText={errors.currentPassword}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="newPassword"
              mb="5px"
            >
              New Password
            </Typography>
            <CustomTextField
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              placeholder="New Password"
              required
              disabled={isLoading}
              value={passwords.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              component="label"
              htmlFor="confirmPassword"
              mb="5px"
            >
              Confirm Password
            </Typography>
            <CustomTextField
              type="password"
              variant="outlined"
              fullWidth
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              disabled={isLoading}
              value={passwords.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Typography variant="h6">Password Requirements</Typography>
        <ul>
          <li>Minimum 8 characters long - the more, the better At least one</li>
          <li>
            lowercase & one uppercase character At least one number, symbol
          </li>
        </ul>
      </Box>
      <Grid container mt={2}>
        <Grid item>
          <Button variant="contained" onClick={save} disabled={isLoading}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Security;
