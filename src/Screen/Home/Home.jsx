import { useNavigate } from "react-router-dom";

import Todos from "../../components/todos";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="bg-gray-500 pt-6 pb-20">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md absolute top-6 right-6"
      >
        Logout
      </button>

      <h1 className="text-2xl font-semibold  flex justify-center pt-4">
        MERN Stack TODO App
      </h1>

      <Todos />
    </div>
  );
}

export default Home;
