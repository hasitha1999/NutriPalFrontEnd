import { createTheme } from '@mui/material/styles';
import { deepPurple } from "@mui/material/colors";

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: deepPurple[900],
        // main: "#f2ef2c",
        dark: "#ba000d",
        contrastText: "#fff",
      },
      primaryVariant: {
        main: "#f2ef2c",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f2ef2c",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
};
