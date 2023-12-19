import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from './Header';
import Footer from './Footer';
import CollectionCards from './CollectionCards';
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

function Collection() {

  // const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const baseURL = import.meta.env.VITE_APIURL;



  // function deleteModalHandleOpen() {
  //   setDeleteModalOpen(true);
  // }

  // function deleteModalHandleClose() {
  //   setDeleteModalOpen(false);
  // }

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['card'],
    queryFn: getAccountCards,
  });

  async function getAccountCards() {
    const response = await fetch(`${baseURL}/api/v1/account/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-type': 'application/json',
      },
    });
    const commits = await response.json();
    return commits;
  }

  async function deleteCard(row: any) {
    const response = await fetch(
      `${baseURL}/api/v1/account/cards/${row.scry_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const commits = await response.json();
    alert(commits?.result);
    refetch();
  }

  return (
    <>
      <Header />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Card</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map((row: any) => (
                <CollectionCards row={row} deleteCard={deleteCard}/>
              ))
            ) : isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error: {error.message}</p>
            ) : (
              <p></p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </>
  );
}

export default Collection;
