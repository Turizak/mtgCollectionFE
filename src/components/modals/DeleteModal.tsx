import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Check, Cancel } from '@mui/icons-material';

function DeleteModal({ open, close, execute }) {
  return (
    <>
      <Dialog open={open} onClose={close}>
        <DialogTitle id="alert-dialog-title">{'Delete Entry'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={close} autoFocus>
            <Cancel />
          </IconButton>
          <IconButton onClick={execute}>
            <Check />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteModal;
