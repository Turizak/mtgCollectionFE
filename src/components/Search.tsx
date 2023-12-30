import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from './Header';
import Footer from './Footer';
import Results from './Results';
import { TextField, Container, Button } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../context/Theme';

function Search() {
  const [inputValue, setInputValue] = useState<string>('');
  const [card, setCard] = useState<any>([]);

  const scryfallURL = import.meta.env.VITE_SFURL;
  const fetchURL = `${scryfallURL}/cards/search?unique=prints&q=${inputValue}`;

  async function getPeople() {
    const response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error('There was a problem');
    }
    const data = await response.json();
    const filteredData = data.data
      .filter((card: any) => card.prices.usd != null)
      .filter((card: any) => card.image_uris != null);
    setCard(filteredData.slice(0, 40));
    return data;
  }

  const { isFetching, isError, data, error, refetch } = useQuery({
    queryKey: ['results'],
    queryFn: getPeople,
    enabled: false,
  });

  function handleClick(e) {
    e.preventDefault();
    refetch()
  }

  return (
    <>
      <Header />
      <ThemeProvider theme={Theme}>
        <Container maxWidth="lg">
          <form>
            <Container
              maxWidth="lg"
              sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}
            >
              <TextField
                variant="outlined"
                label="Card"
                id="card"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ marginLeft: 1 }}
                type="submit"
                onClick={handleClick}
              >
                <SearchIcon />
              </Button>
            </Container>
          </form>
          <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {isFetching ? (
              <span>Loading...</span>
            ) : isError ? (
              <span>Error: {error.message}</span>
            ) : (
              card &&
              card.map((item, index) => <Results key={index} item={item} />)
            )}
          </Container>
        </Container>
      </ThemeProvider>
      <Footer />
    </>
  );
}

export default Search;
