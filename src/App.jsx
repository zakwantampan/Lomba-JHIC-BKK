import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HalamanBkk from "./view/BkkPage";
import FormLowongan from "./view/FormLowongan";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HalamanBkk />} />
          <Route path="/lowongan" element={<FormLowongan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
