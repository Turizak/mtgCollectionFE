import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Header from "./Header";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// MUI Custom Theme

declare module "@mui/material/styles" {
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
const theme = createTheme({
  palette: {
    primary: {
      main: "#BB2649",
    },
    secondary: {
      main: "#26BB98",
    },
  },
});

const Collection = () => {
  const [myCollection, setMyCollection] = useState([]);

  let baseURL = import.meta.env.VITE_APIURL;

  const getAccountCards = async () => {
    await fetch(`${baseURL}/api/v1/account/prices`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-type": "application/json",
      },
    });
    let response = await fetch(`${baseURL}/api/v1/account/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-type": "application/json",
      },
    });
    let commits = await response.json();
    setMyCollection(commits);
  };

  useEffect(() => {
    getAccountCards();
  }, []);

  async function deleteCard(row: any) {
    let response = await fetch(
      `${baseURL}/api/v1/account/cards/${row.scry_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    let commits = await response.json();
    await getAccountCards();
    alert(commits?.result);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Card</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myCollection &&
                myCollection.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.card_name}
                    </TableCell>
                    <TableCell>{"$" + row.price}</TableCell>
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
};

export default Collection;
