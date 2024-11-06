import Login from "./components/auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Screen/Home/Home";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protect Home route with ProtectedRoute */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
