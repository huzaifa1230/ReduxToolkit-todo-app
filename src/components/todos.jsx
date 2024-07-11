import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: editId, text: editText }));
    setEditId(null);
    setEditText("");
  };

  return (
    <>
      <div className="flex justify-center pt-10 font-bold text-xl">Todos</div>
      <div className="pl-12 pr-12">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
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
                    onClick={() => handleEdit(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white bg-red-500 border-0 px-4 py-1 focus:outline-none hover:bg-red-600 rounded text-md"
                    onClick={() => dispatch(removeTodo(todo.id))}
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
