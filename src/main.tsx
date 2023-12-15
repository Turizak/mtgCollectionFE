import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Collection from './components/Collection';
import Login from './components/Login';
import Search from './components/Search';
import Account from './components/Account';

function PrivateRoutes() {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/" />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
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
  </React.StrictMode>
);
