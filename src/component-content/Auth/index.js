import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import server from "../../config/server";
import Alert from "../../component-ui/Alert";

const Auth = (props) => {
  const [interceptorAdded, setInterceptorAdded] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userRole = props.roles?.find((role) => role === sessionStorage.getItem("ROLE"));

  if (!userRole) {
    console.log(userRole, sessionStorage.getItem("ROLE"), props.roles)
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("ROLE");
    navigate("/?error=session-expired");
  }
  
    const requestInterceptor = server.interceptors.request.use(
      (config) => {
        config.headers.Authorization =
          "Bearer " + sessionStorage.getItem("TOKEN");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = server.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 403) {
          sessionStorage.removeItem("TOKEN");
          sessionStorage.removeItem("ROLE");
          navigate("/?error=session-expired");
        } else if (error.response.status === 404) {
          setGlobalError("Not Found");
        } else if (error.response.status !== 400) {
          setGlobalError("Something went wrong");
        }

        return Promise.reject(error);
      }
    );

    setInterceptorAdded(true);

    return () => {
      server.interceptors.response.eject(requestInterceptor);
      server.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  if (!sessionStorage.getItem("TOKEN")) {
    return <Navigate to="/" />;
  }

  return interceptorAdded ? (
    <>
      {props.children}
      <Snackbar
        open={globalError !== ""}
        autoHideDuration={6000}
        onClose={() => setGlobalError("")}
      >
        <Alert
          onClose={() => setGlobalError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {globalError}
        </Alert>
      </Snackbar>
    </>
  ) : (
    ""
  );
};

export default Auth;
