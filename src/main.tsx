import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Theme from './context/Theme'
import App from './App';
import { RefreshProvider } from './context/RefreshProvider';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RefreshProvider>
    <App />
    </RefreshProvider>
    </AuthProvider>
    </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
