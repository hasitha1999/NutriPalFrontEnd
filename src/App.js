import { getTheme } from "./theme/get-theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component-content/Layout";
import routeConfig from "./config/route-config";
import Auth from "./component-content/Auth";

function App() {

  return (
    <ThemeProvider
      theme={getTheme("dark")}
    >
      <BrowserRouter>
        <Routes>
          {routeConfig.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                route.hideLayout ? (
                  !route.noAuth ? (
                    <Auth roles={route.roles}>{route.element}</Auth>
                  ) : (
                    route.element
                  )
                ) : !route.noAuth ? (
                  <Auth roles={route.roles}>
                    <Layout>{route.element}</Layout>
                  </Auth>
                ) : (
                  <Layout>{route.element}</Layout>
                )
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
