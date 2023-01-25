import React, { useState } from "react";
import MTGList from "./MTGList";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const MTGSearch = () => {
  const [myCard, setMyCard] = useState([]);

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
  }

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "block",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              label="Card"
              id="card"
              type="text"
              sx={{ width: "100%" }}
              inputRef={cardRef}
            />
            <Button
              variant="contained"
              sx={{ display: "flex", margin: "auto" }}
              onClick={fetchMTGCard}
            >
              Search Scryfall
            </Button>
            <MTGList mtgCards={myCard} />
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default MTGSearch;
