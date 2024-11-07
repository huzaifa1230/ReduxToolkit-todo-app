// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addTodo } from "../features/todo/todoSlice";

// function AddTodo() {
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch();
//   const addTodoHandler = (e) => {
//     e.preventDefault();
//     dispatch(addTodo(input));
//     setInput("");
//   };
//   return (
//     <form
//       onSubmit={addTodoHandler}
//       className="flex justify-center space-x-3 mt-10"
//     >
//       <input
//         type="text"
//         className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         placeholder="Enter todo"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg"
//       >
//         Add todo
//       </button>
//     </form>
//   );
// }

// export default AddTodo;

import { useState } from "react";

function AddTodo() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodoHandler = async (e) => {
    e.preventDefault();

    window.location.reload();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token missing.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ text: input }), // Send the todo text in the request body
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add todo");
      }

      // Reset input after successful todo creation
      setInput("");
      console.log("Todo added successfully:", data);
    } catch (error) {
      setError(error.message);
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={addTodoHandler}
        className="flex justify-center space-x-3 mt-10"
      >
        <input
          type="text"
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg"
        >
          Add todo
        </button>
      </form>

      {loading && <p>Adding your todo...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default AddTodo;
