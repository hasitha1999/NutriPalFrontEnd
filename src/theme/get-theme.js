import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
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
    typography: {
      h3: {
        fontSize: '1.2rem',
        // fontFamily: 'Poppins',
        '@media (min-width:600px)': {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '2rem',
        },
      },
    },
  });
};
