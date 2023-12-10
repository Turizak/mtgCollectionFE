import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListIcon from "@mui/icons-material/List";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: "#BB2649",
    },
    secondary: {
      main: "#26BB98",
    },
  },
});

function Header() {
  const navigate = useNavigate();

  function goToCollection() {
    navigate("/collection");
  }

  function goToMTGSearch() {
    navigate("/search");
  }
  function goToLogin() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/collection"
                style={{ textDecoration: "none", color: "white" }}
              >
                MTG Collection App
              </Link>
            </Typography>
            <IconButton onClick={goToMTGSearch} style={{ color: "white" }}>
              <AddBoxIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={goToCollection} style={{ color: "white" }}>
              <ListIcon fontSize="medium" />
            </IconButton>

            <IconButton onClick={goToLogin} style={{ color: "white" }}>
              <LogoutIcon fontSize="medium" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
