/* eslint-disable no-inner-declarations */
import React from "react";
import { useState, useEffect } from "react";
import Results from "./Results";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Header from "./Header";
import Footer from "./Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

function Search() {
    const [card, setCard] = useState([])
    const [clicked, setClicked] = useState(false)
    const [loading, setLoading] = useState('')
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
      if (clicked) {
        async function fetchCards() {
          const response = await fetch(`https://api.scryfall.com/cards/search?unique=prints&q=${inputValue}`)
          const data = await response.json();
          setCard([...data.data])
          setLoading('')
        }
          fetchCards()
          setClicked(false)
      }
    }, [clicked])  

    function handleClick(){
      setClicked(true)
      setLoading('Loading...')
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ display: "flex", margin: "auto" }}
              onClick={handleClick}
            >
              Search Scryfall
            </Button>
            <p>{loading}</p>
           <Results card={card} />
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </>
  )
}

export default Search