import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import useScry from '../hooks/useScry';
import Header from './Header';
import Results from './Results';
import LogoutModal from './LogoutModal';
import { TextField, Container, Button } from '@mui/material/';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  const [inputValue, setInputValue] = useState<string>('');
  const {data, error, isError, isFetching, refetch } = useScry(inputValue)

  function handleClick(e: any) {
    e.preventDefault();
    useScry
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
              <span>Error: {error?.message}</span>
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
