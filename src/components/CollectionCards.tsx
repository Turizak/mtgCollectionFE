import { useState } from 'react';
import {
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  import { Edit, Delete, Cancel, Check } from '@mui/icons-material/';

  // MUI Custom Theme
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
  
  // TS Interface for data from GET request
  interface AccountCards {
    id: number;
    account_id: string;
    scry_id: string;
    card_name: string;
    price: string;
    quantity: number;
    image_uris: string;
  }  

function CollectionCards({row, deleteCard}) {
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    function cardModalHandleOpen() {
        setCardModalOpen(true);
      }
    
      function cardModalHandleClose() {
        setCardModalOpen(false);
      }

      function deleteModalHandleOpen() {
        setDeleteModalOpen(true)
      }

      function deleteModalHandleClose() {
        setDeleteModalOpen(false)
      }

  return (
    <>
    <TableRow
    key={row.scry_id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {row.card_name}
    </TableCell>
    <TableCell>{'$' + row.price}</TableCell>
    <TableCell>{row.quantity}</TableCell>
    <TableCell>
      <IconButton onClick={cardModalHandleOpen}>
        <Edit fontSize="medium" />
      </IconButton>
      <Dialog open={cardModalOpen} onClose={cardModalHandleClose}>
        <DialogTitle id="alert-dialog-title" align="center">
          {'Card Details'}
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'column',
          }}
        >
          <img
            src={row.image_uris.small}
            alt="card picture"
            width="100%"
          />
          <TextField
            type="number"
            label="quantity"
            defaultValue={row.quantity}
            sx={{ display: 'flex', marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <IconButton>
            <Check />
          </IconButton>
          <IconButton onClick={close} autoFocus>
            <Cancel />
          </IconButton>
        </DialogActions>
      </Dialog>
      <IconButton onClick={deleteModalHandleOpen}>
        <Delete fontSize="medium" />
      </IconButton>
      <Dialog open={deleteModalOpen} onClose={deleteModalHandleClose}>
        <DialogTitle id="alert-dialog-title">{'Delete Entry'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={deleteModalHandleClose} autoFocus>
            <Cancel />
          </IconButton>
          <IconButton onClick={() => deleteCard(row)}>
            <Check />
          </IconButton>
        </DialogActions>
      </Dialog>
    </TableCell>
  </TableRow>
</>
  )
}

export default CollectionCards