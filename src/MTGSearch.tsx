import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Header from "./Header";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

//MUI Custom Theme

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
  let scryfallURL = import.meta.env.VITE_SFURL;
  let baseURL = import.meta.env.VITE_APIURL;
  let mtgURL = import.meta.env.VITE_MTGURL;

  const [myCard, setMyCard] = useState({
    id: "",
    name: "",
    price: "",
    image: `${mtgURL}`,
  });

  const [disabled, setDisabled] = useState(true);

  const cardRef = useRef<HTMLInputElement>(null);

  async function fetchMTGCard() {
    const response = await fetch(
      `${scryfallURL}/cards/search?order=usd&q=${cardRef?.current?.value}`
    );
    const data = await response.json();
    setMyCard({
      ...myCard,
      id: data.data["0"].id,
      name: data.data["0"].name,
      price: data.data["0"].prices.usd,
      image: data.data["0"].image_uris.normal,
    });
    setDisabled(false);
  }

  async function addCardHandler() {
    const response = await fetch(`${baseURL}/api/v1/account/cards`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        scry_id: `${myCard.id}`,
        name: `${myCard.name}`,
        price: `${myCard.price}`,
        quantity: 1,
      }),
    });
    let commits = await response.json();
    commits?.status === 200 || 201
      ? alert("Added!")
      : alert("Could not add - please try another card");
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
            <br />
            <Paper elevation={12}>
              <img src={myCard.image} alt="card picture" />
              <Typography
                component="h2"
                variant="h5"
                textAlign="center"
                sx={{ margin: 2 }}
              >
                {myCard.name}
              </Typography>
              <Typography
                component="p"
                variant="h6"
                textAlign="center"
                sx={{ margin: 2 }}
              >
                {myCard.price}
              </Typography>
              <Button
                sx={{ display: "flex", margin: "auto" }}
                color="secondary"
                variant="contained"
                onClick={addCardHandler}
                disabled={disabled}
              >
                Add to Collection
              </Button>
            </Paper>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </>
  );
};

export default MTGSearch;
