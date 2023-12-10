import React from "react";
import Login from "./components/Login";
import Search from "./components/Search";
import Account from "./components/Account";
import Collection from "./components/Collection";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/collection" element={<Collection />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}
export default App;
