import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Button from "@mui/material/Button";
import Footer from "./Footer";

const Collection = () => {
  let baseURL = import.meta.env.VITE_APIURL;
  let myCollection: any = [
    {
      id: 8,
      account_id: "2",
      scry_id: "ee0e8c57-3046-414d-be00-39bfb2537026",
      card_name: "Merciless Javelineer",
      price: "0.10",
      quantity: 2,
    },
    {
      id: 119,
      account_id: "2",
      scry_id: "616d1b20-61c1-4d39-a9b5-ad9fd61699e4",
      card_name: "Stifle",
      price: "5.78",
      quantity: 2,
    },
    {
      id: 123,
      account_id: "2",
      scry_id: "38b00110-e3de-40ce-b2bd-9466fe9e53a3",
      card_name: "Radiant, Serra Archangel",
      price: "0.07",
      quantity: 1,
    },
    {
      id: 178,
      account_id: "2",
      scry_id: "5f824a13-08ef-4545-a689-41c1c8371eea",
      card_name: "Doomsday",
      price: "5.92",
      quantity: 1,
    },
    {
      id: 125,
      account_id: "2",
      scry_id: "3c0f5411-1940-410f-96ce-6f92513f753a",
      card_name: "Goblin Guide",
      price: "3.57",
      quantity: 1,
    },
    {
      id: 126,
      account_id: "2",
      scry_id: "240344ff-404d-4894-a6e9-4401cd68cf50",
      card_name: "Goblin Charbelcher",
      price: "0.79",
      quantity: 1,
    },
    {
      id: 127,
      account_id: "2",
      scry_id: "82a42b28-3d1b-4432-b8c9-2d42e4d0e1c5",
      card_name: "Consuming Sinkhole",
      price: "0.02",
      quantity: 1,
    },
    {
      id: 128,
      account_id: "2",
      scry_id: "73d295ac-3c83-47db-a324-aa4907bcefdd",
      card_name: "Akroan Crusader",
      price: "0.09",
      quantity: 1,
    },
    {
      id: 129,
      account_id: "2",
      scry_id: "56001a36-126b-4c08-af98-a6cc4d84210e",
      card_name: "Mox Opal",
      price: "69.32",
      quantity: 1,
    },
    {
      id: 5,
      account_id: "2",
      scry_id: "709f6376-9a33-4900-a7ae-00767fb9f9bf",
      card_name: "Rattlechains",
      price: "0.22",
      quantity: 6,
    },
    {
      id: 6,
      account_id: "2",
      scry_id: "ce573cee-40e0-4740-8b86-538ad8a16bce",
      card_name: "White Knight",
      price: "0.75",
      quantity: 12,
    },
    {
      id: 7,
      account_id: "2",
      scry_id: "f29ba16f-c8fb-42fe-aabf-87089cb214a7",
      card_name: "Lightning Bolt",
      price: "1.12",
      quantity: 9,
    },
  ];

  //   async function getCollection() {
  //     const response = await fetch(`${baseURL}/api/v1/account/cards`, {
  //       method: "GET",
  //       //   credentials: "include",
  //       headers: {
  //         Authentication: "Bearer Token",
  //         "Content-type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     myCollection.push(data);
  //     console.log(myCollection);
  //   }

  function createData(name: string, price: string, quantity: number) {
    return { name, price, quantity };
  }

  const rows = [
    createData("Merciless Javelineer", "0.10", 2),
    createData("Stifle", "5.78", 2),
    createData("Radiant, Serra Archangel", "0.07", 1),
    createData("Doomsday", "5.92", 1),
    createData("Goblin Guide", "3.57", 1),
    createData("Goblin Charbelcher", "0.79", 1),
    createData("Consuming Sinkhole", "0.02", 1),
    createData("Akroan Crusader", "0.09", 1),
    createData("Mox Opal", "69.32", 1),
    createData("Rattlechains", "0.22", 6),
    createData("White Knight", "0.75", 12),
    createData("Lightning Bolt", "1.12", 9),
  ];

  return (
    <>
      <Header />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Card</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Qty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{"$" + row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button onClick={getCollection}>Get My Collection</Button> */}
      <Footer />
    </>
  );
};

export default Collection;
