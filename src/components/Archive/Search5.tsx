import { useState, useEffect } from 'react';
import Results from '../Results';
import Header from '../Header';
import Footer from '../Footer';
import { Box, TextField, Container, Button } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../material ui/Theme';

//MUI Custom Theme

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

function Search5() {
  const [card, setCard] = useState<any>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [loading, setLoading] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [badData, setBadData] = useState<any>([]);
  const [goodData, setGoodData] = useState<any>([]);

  const scryfallURL = import.meta.env.VITE_SFURL;

  useEffect(() => {
    if (clicked) {
      async function fetchCards() {
        const response = await fetch(
          // `${scryfallURL}/cards/search?unique=prints&q=${inputValue}`
          `${scryfallURL}/cards/search?unique=prints&q=crusade`
        );
        const data = await response.json();
        filter(data.data);
        goodData.slice(0, 40);
        setCard([...goodData]);
        setLoading('');
      }
      fetchCards();
      setClicked(false);
      setBadData([]);
      setGoodData([]);
    }
  }, [clicked]);

  function filter(array: string[]) {
    array.forEach((item: any) => {
      switch (true) {
        case Object.hasOwn(item, 'image_uris') === false:
          badData.push(item);
          break;
        case item.prices.usd === null:
          badData.push(item);
          break;
        case goodData.length >= 40:
          badData.push(item);
          break;
        default:
          goodData.push(item);
      }
    });
    return goodData;
  }

  function handleClick() {
    setClicked(true);
    setLoading('Loading...');
  }

  return (
    <div>
      <Header />
      <ThemeProvider theme={Theme}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'block',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <form onSubmit={handleClick}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Card"
                id="card"
                type="text"
                sx={{ width: '100%' }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{
                  display: 'flex',
                  margin: 'auto',
                  marginBottom: 2,
                  padding: 1,
                }}
                onClick={handleClick}
              >
                <SearchIcon />
              </Button>
            </form>
            <p>{loading}</p>
            {/* <Results card={card} /> */}
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default Search5;
