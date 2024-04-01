import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#fff",
        dark: "#ba000d",
        contrastText: "#fff",
      },
      primaryVariant: {
        main: "#fff",
        contrastText: "#000",
      },
      secondary: {
        light: "#ff7961",
        main: "#8A47EB",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
};
