import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import useRefresh from '../hooks/useRefresh';
import AuthContext from '../context/AuthProvider';
import Header from './Header';
import CollectionCards from './CollectionCards';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

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
  const [message, setMessage] = useState<string>('')
  const baseURL = import.meta.env.VITE_APIURL;
  const { auth } = useContext(AuthContext)
  const token = auth.accessToken
  const refresh = useRefresh()

  async function getAccountCards() {
    try {
      const response = await fetch(`${baseURL}/api/v1/account/cards`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      const commits = await response.json();
      return commits;
    } catch (error: any) {
      if (error.message.startsWith('406')) {
      refresh()
     } else {
      console.error(error);
    }
  }
}

  async function deleteCard(row: any) {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/account/cards/${row.scry_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`There was a problem: ${response.status}`);
      }
      const commits = await response.json();
      manageMessage(commits?.result);
      refetch();
    } catch (error:any) {
      if (error.message === 406) {
        refresh()
      }
      console.error('Error fetching data: ', error);
    }
  }

  const { isLoading, isFetching, isError, data, error, refetch } = useQuery({
    queryKey: ['card'],
    queryFn: getAccountCards,
  });

  function manageMessage(content) {
    setMessage(content)
    setTimeout(()=> {
      setMessage('')
    }, 3000)
  }

  return (
    <>
      <Header />
      <Typography sx={{display: 'flex', justifyContent: 'center', padding: .5}}>
            <span>{message}</span>
          </Typography>
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
                <CollectionCards row={row} deleteCard={deleteCard} />
              ))
            ) : isLoading || isFetching ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell>Error: {error.message}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Collection;
