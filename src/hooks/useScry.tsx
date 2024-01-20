import { useQuery } from '@tanstack/react-query';

function useScry(card: string) {
  const scryfallURL = import.meta.env.VITE_SFURL;

  const getData = async () => {
    const response = await fetch(
      scryfallURL + '/cards/search?unique=prints&q=' + card
    );
    if (!response.ok) {
      throw new Error(`${error?.message}`);
    }
    const data = await response.json();
    const filteredData = data.data
      .filter((card: any) => card.prices.usd != null)
      .filter((card: any) => card.image_uris != null);
    const dataArray = Array.from(Object.values(filteredData));
    const slicedData = dataArray.slice(0, 48);
    return slicedData;
  };

  const { data, error, refetch, isLoading, isFetching, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: getData,
    enabled: false,
  });

  return { data, error, refetch, isLoading, isFetching, isError };
}

export default useScry;
