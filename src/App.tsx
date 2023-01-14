import Login from "./Login";
import MTGSearch from "./MTGSearch";
import NotFound from "./NotFound";
import Collection from "./Collection";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MTGSearch />} />
      <Route path="/login" element={<Login />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
