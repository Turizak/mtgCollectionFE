import Login from "./Login";
import MTGSearch from "./MTGSearch";
import NotFound from "./NotFound";
import Account from "./Account";
import Collection from "./Collection";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/collection" element={<Collection />} />
        <Route path="/search" element={<MTGSearch />} />
      </Route>
    </Routes>
  );
}

export default App;
