import useAuth from './useAuth';
import { useMutation } from '@tanstack/react-query';

const useRefresh = () => {
  const { auth, setAuth } = useAuth();
  const baseURL = import.meta.env.VITE_APIURL;
  const url = `${baseURL}/api/v1/account/refresh`;

  async function refresh() {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: auth.refreshToken,
        }),
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const commits = await response.json();
      const accessToken = commits.token
      const refreshToken = commits.refreshToken
      setAuth({ accessToken, refreshToken })
      console.log('New Access Token Granted')
      return { accessToken, refreshToken }
    } catch (error) {
      console.error(error);
    }
  }

  const { mutate } = useMutation({
    mutationFn: refresh,
  });

   return mutate
}

export default useRefresh;
