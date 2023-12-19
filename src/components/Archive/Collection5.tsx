import { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
import Theme from "../material ui/Theme"

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
  id: number,
  account_id: string,
  scry_id: string,
  card_name: string,
  price: string,
  quantity: number,
  image_uris: string
}

function Collection5() {
  const [myCollection, setMyCollection] = useState<AccountCards[]>([]);
  const [loading, setLoading] = useState<string>('Loading...')

  const baseURL = import.meta.env.VITE_APIURL;

  async function getAccountCards() {
    const response = await fetch(`${baseURL}/api/v1/account/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-type': 'application/json',
      },
    });
    const commits = await response.json();
    setLoading('')
    setMyCollection([...commits]);
  }

  useEffect(() => {
    getAccountCards();
  }, []);

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
    await getAccountCards();
    alert(commits?.result);
  }

  return (
    <>
      <ThemeProvider theme={Theme}>
        <Header />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Card</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <p>{loading}</p>
              {myCollection &&
                myCollection.map((row: any) => (
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
                      <IconButton onClick={() => deleteCard(row)}>
                        <DeleteIcon fontSize="medium" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
      <Footer />
    </>
  );
}

export default Collection5;
