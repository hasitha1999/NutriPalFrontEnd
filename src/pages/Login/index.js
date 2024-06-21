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
import { getforgotPassword, loginUser } from "../../use-cases/login-user";
import { CustomTextField } from "../../component-ui/CustomTextField/CustomTextField";

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
  const [commonError, setCommonError] = React.useState("");
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      if (error === "session-expired") {
        setCommonError("Session Expired");
      }
    }

    if (searchParams.get("logout")) {
      sessionStorage.removeItem("TOKEN");
      sessionStorage.removeItem("ROLE");
    }
  }, []);

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
        setShowErrorMessage(true);
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
    } else {
      getforgotPassword(formData).then((response) => {
        MySwal.fire(
          "success!",
          "Password reset process will recived via email",
          "success"
        );
      });
    }
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
                  Invalid Gym ID or Password
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
                  Username
                </Typography>
                <CustomTextField
                  variant="outlined"
                  fullWidth
                  autoFocus
                  value={formData.gymID}
                  onChange={handleFormValueChange}
                  error={formErrorMessages.gymID !== ""}
                  helperText={formErrorMessages.gymID}
                  placeholder="Gym ID"
                  name="gymID"
                  autoComplete="gymID"
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
                  Password
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
              <Stack
                justifyContent="flex-end"
                direction="row"
                alignItems="center"
                my={2}
              >
                <Typography
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                    cursor: "pointer",
                  }}
                  onClick={forgotPassword}
                >
                  Forgot Password ?
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
              >
                Sign In
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
