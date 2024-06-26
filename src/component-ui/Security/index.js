import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  getAllergiesDetails,
  getNCDDetails,
  getUserDetails,
} from "../../use-cases/get-user-details";
import { useEffect, useState } from "react";
import { editUser } from "../../use-cases/edit-user";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { CustomTextField } from "../../component-ui/CustomTextField/CustomTextField";
import { CustomSelect } from "../../component-ui/CustomSelect/index";

const Security = () => {
  const MySwal = withReactContent(Swal);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {};

  const save = () => {
    setIsLoading(true);
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
              name="newPassword"
              placeholder="New Password"
              required
              disabled={isLoading}
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
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Typography variant="h6">Password Requirements</Typography>
        <ul>
          <li>Minimum 8 characters long - the more, the better At least one</li>
          <li>
            lowercase & one uppercase character At least one number, symbol, or
          </li>
          <li>whitespace character</li>
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
