import { useQuery } from '@tanstack/react-query';
import { useState, Suspense } from 'react';

function Search3() {

  const { isLoading, isError, isFetching, data, error, refetch } = useQuery({
    queryKey: ['cards'], queryFn: getPeople, enabled: false
  });

  async function getPeople() {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?unique=prints&q=stasis`
    );
    if (!response.ok) {
      throw new Error('There was a problem');
    }
    const data = await response.json();
    return data;
  }

  return (
    <div>
        <button onClick={()=> refetch()}>Execute</button>

    {data ? (
        <>
        {data.data.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
        </>
    ) : isError ? (<span>Error: {error.message}</span>
    ) : isLoading ? (
        <span>Loading...</span>
    ) : (
        <span></span>
    )}
    <div>{isFetching ? 'Fetching...' : null}</div>
    </div>
  );
}

export default Search3;
