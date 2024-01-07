import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RefreshContext from '../context/RefreshProvider';
import useRefresh from '../hooks/useRefresh';
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { Cancel, Check } from '@mui/icons-material/';

function LogoutModal() {
  const { open, setOpen } = useContext(RefreshContext);
  const refresh = useRefresh();
  const navigate = useNavigate();

  function stayLoggedIn() {
    refresh();
    setOpen(false);
  }

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <Dialog open={open}>
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}
      >
        <DialogContentText id="alert-dialog-description">
          Would you like to continue your sesssion?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton onClick={stayLoggedIn}>
          <Check />
        </IconButton>
        <IconButton onClick={() => logout()}>
          <Cancel />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutModal;
