import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: 'hsla(0, 0%, 50%,1)',
    },
    secondary: {
      main: 'hsla(0, 0%, 30%,1)',
    }
  }
  /* 
  palette: {
    primary: {
      main: "#BB2649", // Crimson
      light: "#f0807c", // Lighter Crimson
      dark: "#7d193e", // Darker Crimson
      contrastText: "#fff", // White
    },
    secondary: {
      main: "#26bb98", // Turquoise
      light: "#91f2dd", // Lighter Turquoise
      dark: "#1a836d", // Darker Turquoise
      contrastText: "#000", // Black
    },
    background: {
      default: "#f5f5f5", // Light Gray
      paper: "#fff", // White
    },
    text: {
      primary: "#444", // Dark Gray
      secondary: "#666", // Lighter Gray
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#444",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#444",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      color: "#444",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#444",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      color: "#444",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#444",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      color: "#444",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      color: "#666",
    },
  },
  */
});

export default Theme;
