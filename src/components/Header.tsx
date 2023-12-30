import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material/';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListIcon from '@mui/icons-material/List';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './material ui/Theme';

declare module '@mui/material/styles' {
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

function Header() {
  const navigate = useNavigate()
  function goToCollection() {
    navigate('/')
  }

  function goToMTGSearch() {
    navigate("/search");
  }
  function goToLogin() {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/collection"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                MTG Collection App
              </Link>
            </Typography>
            <IconButton onClick={goToMTGSearch} style={{ color: 'white' }}>
              <AddBoxIcon fontSize="medium" />
            </IconButton>
            <IconButton onClick={goToCollection} style={{ color: 'white' }}>
              <ListIcon fontSize="medium" />
            </IconButton>

            <IconButton onClick={goToLogin} style={{ color: 'white' }}>
              <LogoutIcon fontSize="medium" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
