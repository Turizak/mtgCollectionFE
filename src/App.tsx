import Login from "./Login";
import MTGSearch from "./MTGSearch";
import NotFound from "./NotFound";
import Collection from "./Collection";
import Signup from "./Signup";
import PrivateRoutes from "./PrivateRoutes";
import "./App.css";
import { Router, Route, Routes } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/collection" element={<Collection />} />
          <Route path="/search" element={<MTGSearch />} />
        </Route>
      </Routes>
  );
}

export default App;
