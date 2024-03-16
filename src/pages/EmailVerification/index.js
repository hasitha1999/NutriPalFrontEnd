import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../use-cases/verify-email";

export default function EmailVerification() {
  
  let { verificationToken } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    verifyEmail(verificationToken).then((response) => {
      window.sessionStorage.setItem("TOKEN", response.data.token);
      navigate("/subPackages")
    })
    .catch(() => {
      navigate("/signup")
    })
  }, []);

  return (
    <Container component="div" maxWidth="xs" style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CssBaseline />
      <div style={{textAlign: 'center'}}>
        <CircularProgress />
        <Typography variant="h5">Verifying</Typography>
      </div>
    </Container>
  );
}
