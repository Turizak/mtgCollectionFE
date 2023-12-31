import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from './Header';
import Results from './Results';
import LogoutModal from './LogoutModal';
import { TextField, Container, Button } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  const [inputValue, setInputValue] = useState<string>('');
  const scryfallURL = import.meta.env.VITE_SFURL;
  const fetchURL = `${scryfallURL}/cards/search?unique=prints&q=${inputValue}`;

  async function getCards() {
    const response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error(`${error?.message}`)
    }
    const data = await response.json();
    const filteredData = data.data
    .filter((card: any) => card.prices.usd != null)
    .filter((card: any) => card.image_uris != null)
    const dataArray = Array.from(Object.values(filteredData))
    const slicedData = dataArray.slice(0,48)
    return slicedData
  }

  const { isFetching, isError, data, error, refetch } = useQuery({
    queryKey: ['results'],
    queryFn: getCards,
    enabled: false,
  });

  function handleClick(e) {
    e.preventDefault();
    refetch();
  }

  return (
    <>
      <Header />
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
              data &&
              data.map((item) => <Results item={item} />)
            )}
        </Container>
      </Container>
      <LogoutModal />
      <div style={{ height: '100px' }}></div>
    </>
  );
}

export default Search;
