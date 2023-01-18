import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Footer from "./Footer";

const Collection = () => {
  const [myCollection, setMyCollection] = useState([]);

  let baseURL = import.meta.env.VITE_APIURL;

  useEffect(() => {
    fetch(`${baseURL}/api/v1/account/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setMyCollection(data));
  }, []);

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
