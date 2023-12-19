import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from './Header';
import Footer from './Footer';
import Results from './Results';
import { Box, TextField, Container, Button } from '@mui/material/';
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

function Search() {
  const [inputValue, setInputValue] = useState<string>('');
  const [card, setCard] = useState<any>([])
  
  const scryfallURL = import.meta.env.VITE_SFURL;

  const { isFetching, isError, data, error, refetch } = useQuery({
    queryKey: ['results'], queryFn: getPeople, enabled: false
  });

  async function getPeople() {
    const response = await fetch(
      `${scryfallURL}/cards/search?unique=prints&q=${inputValue}`
    );
    if (!response.ok) {
      throw new Error('There was a problem');
    }
    const data = await response.json();
    const filteredData = data.data
      .filter((card: any) => card.prices.usd != null)
      .filter((card: any) => card.image_uris != null)
    setCard(filteredData.slice(0, 40))
    return data
  }

  return (
    <div>
      <Header />
      <ThemeProvider theme={Theme}>
        <Container maxWidth="lg">
        <Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'center', margin: 2}}>
              <TextField
                variant="outlined"
                label="Card"
                id="card"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
              variant='contained'
              sx={{marginLeft: 1}}
                onClick={()=> refetch()}
              >
                <SearchIcon />
              </Button>
              </Container>
              <Container maxWidth='lg' sx={{display: 'flex', flexWrap: 'wrap'}}>
            {card != null ? (
              card.map((item, index) => 
              <Results key={index} item={item} />)
    ) : isError ? (<span>Error: {error.message}</span>
    ) : isFetching ? (
        <span>Loading...</span>
    ) : (
        <span></span>
    )}
    </Container>

        </Container>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default Search;
