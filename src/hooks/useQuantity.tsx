import { useMutation } from "@tanstack/react-query"

function useQuantity(body, id) {
const baseURL = import.meta.env.VITE_APIURL;
const token = localStorage.getItem('accessToken');

    const patchData = async() => {
        const response = await fetch(baseURL + '/api/v1/account/cards/' + id, {
            method: 'PATCH',
            headers: {
              Accept: '*/*',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
          if (!response.ok) {
            throw new Error(`There was an error: ${response.status}`);
          }
          const commits = await response.json();
    }

    const { mutate, error } = useMutation({
        mutationFn: patchData,
      });

  return {mutate, error }
  
}

export default useQuantity