import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { Cancel, Check } from '@mui/icons-material';

function CardModal({ open, close, image, quantity }) {
  return (
    <>
      <Dialog open={open} onClose={close}>
        <DialogTitle id="alert-dialog-title" align="center">{'Card Details'}</DialogTitle>
        <DialogContent sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column'}}>
        <img src={image} alt="card picture" width='100%' />
        <TextField type="number" label="quantity" defaultValue={quantity} sx={{display: 'flex', marginTop: 2}}/>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
          <IconButton>
            <Check />
          </IconButton>
          <IconButton onClick={close} autoFocus>
            <Cancel />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CardModal;

