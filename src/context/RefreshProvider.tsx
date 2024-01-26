import { createContext, useEffect, useState } from 'react';
const RefreshContext = createContext<any>({});

export const RefreshProvider = ({ children }) => {
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
