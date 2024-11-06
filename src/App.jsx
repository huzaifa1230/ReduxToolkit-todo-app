import Login from "./components/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screen/Home/Home";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
