import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import MTGList from "./MTGList";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Footer from "./Footer";

const MTGSearch = () => {
  const [myCard, setMyCard] = useState([]);
  const [myCardPic, setMyCardPic] = useState(
    "https://media.wizards.com/2022/30a/en_jiTqp9fC78.png"
  );

  const cardRef = React.useRef<HTMLInputElement>(null);

  let scryfall: any = [];
  let scryfallURL = import.meta.env.VITE_SFURL;

  async function fetchMTGCard() {
    const response = await fetch(
      `${scryfallURL}/cards/search?order=usd&q=${cardRef?.current?.value}`
    );
    const data = await response.json();
    scryfall.push(data);

    let transformedCards = scryfall.map((scryfallData: any, index: any) => {
      return {
        key: { index },
        id: scryfallData.data[0].id,
        name: scryfallData.data[0].name,
        price: scryfallData.data[0].prices.usd,
        image: scryfallData.data[0].image_uris.normal,
      };
    });

    setMyCard(transformedCards);
    setMyCardPic("");
  }

  return (
    <>
      <Header />
      <Container maxWidth="xs">
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              label="Card"
              id="card"
              type="text"
              inputRef={cardRef}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={fetchMTGCard}>
              Search Scryfall
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <img src={myCardPic} alt="" />
              <MTGList mtgCards={myCard} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default MTGSearch;
