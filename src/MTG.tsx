import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const MTG = (props: any) => {
  let baseURL = import.meta.env.VITE_APIURL;

  async function addCardHandler() {
    const response = await fetch(`${baseURL}/api/v1/account/cards`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        scry_id: `${props.id}`,
        name: `${props.name}`,
        price: `${props.price}`,
        quantity: 1,
      }),
    });
    alert("Added!");
  }

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
        }}
      >
        <ul>
          <img src={props.image} alt="card image" />
          <h2>{props.name}</h2>
          <h3>{props.id}</h3>
          <p>${props.price}</p>
          <Button
            sx={{ display: "flex", margin: "auto" }}
            variant="contained"
            onClick={addCardHandler}
          >
            Add to Collection
          </Button>
        </ul>
      </Paper>
    </Container>
  );
};

export default MTG;
