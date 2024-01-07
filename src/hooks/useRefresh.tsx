import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { useMutation } from '@tanstack/react-query';

function useRefresh() {
  const { setAuth } = useContext(AuthContext);
  const baseURL = import.meta.env.VITE_APIURL;
  const url = `${baseURL}/api/v1/account/refresh`;

  async function refresh() {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: localStorage.refreshToken,
      }),
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const commits = await response.json();
    const accessToken = commits.token;
    localStorage.setItem('accessToken', accessToken);
    setAuth({ accessToken });
    console.log('New Access Token Granted');
    return { accessToken };
  }
  const { mutate } = useMutation({
    mutationFn: refresh,
  });

  return mutate;
}

export default useRefresh;
