import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './context/Theme'
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
