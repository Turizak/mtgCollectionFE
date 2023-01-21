import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = () => {
  const navigate = useNavigate();

  function goToCollection() {
    navigate("/collection");
  }

  function goToMTGSearch() {
    navigate("/search");
  }
  function goToLogin() {
    localStorage.clear()
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/collection' style={{textDecoration:'none', color:'white'}}>MTG Collection App</Link>
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
