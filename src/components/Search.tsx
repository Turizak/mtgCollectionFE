/* eslint-disable no-inner-declarations */
import { useState, useEffect } from 'react';
import Results from './Results';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Header from './Header';
import Footer from './Footer';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './material ui/Theme';

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

interface UnknownObject {
  prop1?: string;
  prop2?: string;
}

function Search() {
  const [card, setCard] = useState<never[]>([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [badData, setBadData] = useState([]);
  const [goodData, setGoodData] = useState([]);

  const scryfallURL = import.meta.env.VITE_SFURL;

  useEffect(() => {
    if (clicked) {
      async function fetchCards() {
        const response = await fetch(
          `${scryfallURL}/cards/search?unique=prints&q=${inputValue}`
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
    // @ts-expect-error // Cannot find the correct type.  First type = Empty array.  Data = Array of objects.
    array.forEach((item: UnknownObject) => {
      switch (true) {
        case Object.hasOwn(item, 'image_uris') === false:
          // @ts-expect-error // Cannot find the correct type.  First type = Empty array.  Data = Array of objects.
          badData.push(item);
          break;
        // @ts-expect-error // Cannot find the correct type.  First type = Empty array.  Data = Array of objects.
        case item.prices.usd === null:
          // @ts-expect-error // Cannot find the correct type.  First type = Empty array.  Data = Array of objects.
          badData.push(item);
          break;
        case goodData.length >= 40:
          // @ts-expect-error // Cannot find the correct type.  First type = Empty array.  Data = Array of objects.
          badData.push(item);
          break;
        default:
          // @ts-expect-error // Cannot find the correct type.  First type = Empty array.  Data = Array of objects.
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
            <p>{loading}</p>
            <Results card={card} />
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default Search;
