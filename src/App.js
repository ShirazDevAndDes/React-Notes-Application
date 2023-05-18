import TodoModal from "./components/todoModal";
import "./App.css";
import { useEffect, useState } from "react";
import * as bootstrap from "bootstrap/dist/js/bootstrap";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [todos, setTodos] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function searchTodos(title) {
    const getTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(
      getTodos.filter((todos) =>
        todos.title.toUpperCase().includes(title.toUpperCase())
      )
    );
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      if (todo.id !== id) {
        // console.log("true " + todo.id);
        return true;
      } else {
        // console.log("false " + todo.id);
        return false;
      }
    });

    localStorage.setItem("todos", JSON.stringify(newTodos));

    setTodos(JSON.parse(localStorage.getItem("todos")));

    toast.error("Todo Deleted");
  }

  useEffect(() => {
    if (
      localStorage.getItem("todos") !== null &&
      localStorage.getItem("todos").length > 0
    ) {
      setTodos(JSON.parse(localStorage.getItem("todos")));

      console.log(todos);
    } else {
      setTodos([
        {
          id: 1,
          title: "Get Groceries",
          des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi odit quae commodi quam vel! Autem veritatis error ea voluptas quisquam veniam eaque dolor animi. Inventore, id veniam. Aperiam, quasi alias!",
          importance: "normal",
          date: "22-10-2022",
        },
        {
          id: 2,
          title: "Got To Some Place",
          des: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero modi illum sit sint dolore rerum illo, quos ducimus corrupti magni, quam velit molestiae vitae officia eos corporis! Nihil, incidunt quibusdam.",
          importance: "important",
          date: "30-10-2022",
        },
      ]);
    }
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="colored"
        />
        <TodoModal todos={todos} setTodos={setTodos} />
        <div className="col-12 col-md-8 mt-5">
          <div className="card">
            <div className="card-body">
              <input
                type="text"
                value={searchValue}
                placeholder="Search Todo"
                className="form-control mb-2 shadow-none"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  searchTodos(e.target.value);
                }}
              />
              <button
                className="btn btn-primary w-100"
                data-bs-toggle="modal"
                data-bs-target="#todo-modal"
              >
                Add Todo
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 mt-4" id="todo-list">
          <div className="container-fluid">
            <div className="row">
              {todos &&
                todos.map((todo, index) => {
                  let bgColor;

                  if (todo.importance === "important") {
                    bgColor = "red";
                  } else {
                    bgColor = "blue";
                  }

                  return (
                    <div key={index} className="col-md-6 col-lg-4 mb-3">
                      <div
                        className="card shadow h-100 position-relative"
                        style={{
                          backgroundColor: bgColor,
                          color: "white",
                        }}
                        data-id={todo.id}
                      >
                        <div
                          className="position-absolute top-0 end-0 btn-close p-4"
                          onClick={() => deleteTodo(todo.id)}
                        ></div>
                        <div className="card-body d-flex flex-column">
                          <h4 className="card-title">{todo.title} </h4>
                          <p className="card-text line-clamp">{todo.des}</p>
                          <p className="mt-auto">{todo.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
