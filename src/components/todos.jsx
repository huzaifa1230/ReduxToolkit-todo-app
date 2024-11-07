import { useState, useEffect } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todo", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/todo/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ text: editText }),
      });

      if (!response.ok) {
        throw new Error("Error updating todo");
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === editId ? { ...todo, text: editText } : todo
        )
      );

      setEditId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleRemove = async (id) => {
    console.log("Todo ID to be deleted:", id);
    try {
      const response = await fetch(`http://localhost:5000/api/todo/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting todo");
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center pt-10 font-bold text-xl">Todos</div>
      <div className="pl-12 pr-12">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo._id}
          >
            {editId === todo._id ? (
              <form onSubmit={handleUpdate} className="flex flex-1 space-x-3">
                <input
                  type="text"
                  className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out flex-1"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded-lg text-md"
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <div className="text-white">{todo.text}</div>
                <div className="flex space-x-2">
                  <button
                    className="text-white bg-blue-500 border-0 px-4 py-1 focus:outline-none hover:bg-blue-600 rounded text-md"
                    onClick={() => handleEdit(todo._id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white bg-red-500 border-0 px-4 py-1 focus:outline-none hover:bg-red-600 rounded text-md"
                    onClick={() => handleRemove(todo._id)}
                  >
                    X
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </div>
    </>
  );
}

export default Todos;
