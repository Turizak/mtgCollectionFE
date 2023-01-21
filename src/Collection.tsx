import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";

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
    })
    let response = await fetch(`${baseURL}/api/v1/account/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-type": "application/json",
      },
    });
    let commits = await response.json();
    setMyCollection(commits)
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
      <Header />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Card</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell></TableCell>
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
                    <Button variant="contained" onClick={() => deleteCard(row)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </>
  );
};

export default Collection;
