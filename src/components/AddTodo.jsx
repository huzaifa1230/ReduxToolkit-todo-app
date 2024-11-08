import { useState } from "react";

function AddTodo({ setTodos }) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodoHandler = async (e) => {
    e.preventDefault();

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
        body: JSON.stringify({
          text: input,
          priority: priority,
          deadline: deadline,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add todo");
      }

      setTodos((prevTodos) => [...prevTodos, data]);

      setInput("");
      setPriority(false);
      setDeadline("");
      console.log("Todo added successfully:", data);
    } catch (error) {
      setError(error.message);
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-white mb-6">
        Add New Todo
      </h2>

      <form onSubmit={addTodoHandler} className="space-y-4">
        {/* Todo Input */}
        <div className="flex flex-col">
          <label htmlFor="todoText" className="text-white mb-2">
            Todo Description
          </label>
          <input
            id="todoText"
            type="text"
            className="bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 py-2 px-4"
            placeholder="Enter todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={priority}
            onChange={(e) => setPriority(e.target.checked)}
            className="mr-3 h-5 w-5 rounded border-gray-700 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-white">Mark as Priority</span>
        </div>

        <div className="flex flex-col">
          <label htmlFor="deadline" className="text-white mb-2">
            Set a Deadline
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 py-2 px-4"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none"
          >
            {loading ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mt-3">{error}</p>}
    </div>
  );
}

export default AddTodo;
