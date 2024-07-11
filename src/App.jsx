import AddTodo from "./components/AddTodo";
import Todos from "./components/todos";

function App() {
  return (
    <>
      <div className="bg-gray-500 pt-6">
        <h1 className="text-2xl font-semibold flex justify-center pt-4">
          TODO App using redux toolkit
        </h1>
        <AddTodo />
        <Todos />
      </div>
    </>
  );
}

export default App;
