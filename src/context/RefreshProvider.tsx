import { createContext, useContext, useEffect, useState } from 'react';
import AuthContext from './AuthProvider';

const RefreshContext = createContext<any>({});

export const RefreshProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_APIURL;
  const url = `${baseURL}/api/v1/account/refresh`;
  const { setAuth } = useContext(AuthContext);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(true);
    }, 570000);
    setIntervalId(interval);
    return () => clearInterval(interval);
  }, []);

  return (
    <RefreshContext.Provider value={{ intervalId, open, setOpen }}>
      {children}
    </RefreshContext.Provider>
  );
};

export default RefreshContext;
