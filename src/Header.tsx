import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

const Header = () => {
  const navigate = useNavigate();

  function goToCollection() {
    navigate("/collection");
  }

  function goToMTGSearch() {
    navigate("/");
  }
  function goToLogin() {
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MTG Collection App
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "secondary.main", m: 1 }}
            onClick={goToMTGSearch}
          >
            Add Cards
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "secondary.main", m: 1 }}
            onClick={goToCollection}
          >
            My Collection
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "secondary.main", m: 1 }}
            onClick={goToLogin}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
