import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./pages/Navbar";

import { Assignment2 } from "./pages/Assignment2";
import { Assignment1 } from "./pages/Assignment1";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="assignment-1" element={<Assignment1 />} />
        <Route path="assignment-2" element={<Assignment2 />} />
      </Route>
    </Routes>
  );
}

export default App;
