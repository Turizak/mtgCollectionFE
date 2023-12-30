import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import Header from './Header';
import Footer from './Footer';
import CollectionCards from './CollectionCards';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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
  const baseURL = import.meta.env.VITE_APIURL;
  const { auth } = useContext(AuthContext)
  const token = auth.accessToken

  async function getAccountCards() {
    try {
      const response = await fetch(`${baseURL}/api/v1/account/cards`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });
      if (response.status === 406) {() => fetch(`${baseURL}/api/v1/account/refresh`)
       return
      }
      if (response.status === 401) {
        throw new Error(`${response.status}`)
      }
      const commits = await response.json();
      return commits;
    } catch (error) {
      console.error('Error fetching data: ', error);
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
      alert(commits?.result);
      refetch();
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  const { isLoading, isFetching, isError, data, error, refetch } = useQuery({
    queryKey: ['card'],
    queryFn: getAccountCards,
  });


  return (
    <>
      <Header />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow color="secondary">
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
      <Footer />
    </>
  );
}

export default Collection;
