
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HalamanBkk from "./view/BkkPage";
import FormLowongan from "./view/FormLowongan";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
          <Route path="/" element={<HalamanBkk />} />
          <Route path="/lowongan" element={<FormLowongan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
