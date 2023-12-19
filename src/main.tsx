import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Navigate,
  Outlet,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import Collection from './components/Collection';
import Login from './components/Login';
import Search from './components/Search';
import Account from './components/Account';

const queryClient = new QueryClient();

function PrivateRoutes() {
  const auth = localStorage.getItem('token');
  return auth ? <Outlet /> : <Navigate to="/" />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Collection />} />
            <Route path="/search" element={<Search />} />
            <Route path="/collection" element={<Collection />} />
          </Route>
          <Route path="*" element={<h1>404 - There's nothing here!</h1>} />
        </Routes>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
