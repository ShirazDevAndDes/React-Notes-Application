import { useState } from "react";

import * as bootstrap from "bootstrap/dist/js/bootstrap";
import { toast } from "react-toastify";

export default function TodoModal({ todos, setTodos }) {
  const [createTodoForm, setCreateTodoForm] = useState({
    title: "",
    importance: "normal",
    date: "",
    des: "",
  });

  function formInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setCreateTodoForm({
      ...createTodoForm,
      [name]: value,
    });
    // console.log(createTodoForm);
  }

  function empty(value, msg = "") {
    if (value.length > 0) {
      return true;
    }

    toast.error(msg);
    return false;
  }

  function createTodo() {
    const date = new Date(createTodoForm.date);
    const dateFormatted =
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();

    const formData = {
      id: todos[todos.length - 1].id + 1,
      title: createTodoForm.title,
      des: createTodoForm.des,
      importance: createTodoForm.importance,
      date: dateFormatted,
    };

    const newData = [...todos, formData];

    setTodos(newData);

    localStorage.setItem("todos", JSON.stringify(newData));
    // console.log(localStorage.getItem("todos"));
    toast.success("Todo Created");
  }

  function submitForm() {
    toast.dismiss();
    // console.log(createTodoForm);
    const checkTitle = empty(createTodoForm.title, "Your title field is empty");
    const checkDescription = empty(
      createTodoForm.des,
      "Your description field is empty"
    );
    const checkImportance = empty(
      createTodoForm.importance,
      "You have not selected importance"
    );
    const checkDate = empty(createTodoForm.date, "Your date field is empty");

    if (checkTitle && checkDescription && checkImportance && checkDate) {
      createTodo();
    }
  }

  return (
    <div
      className="modal fade"
      id="todo-modal"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitleId">
              Todo Info
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <input type="hidden" name="id" value="" />
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control shadow-none"
                  name="title"
                  id=""
                  placeholder=""
                  onChange={(e) => formInput(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Importance
                </label>
                <select
                  className="form-select form-select shadow-none"
                  name="importance"
                  id=""
                  onChange={(e) => formInput(e)}
                >
                  <option value="normal" defaultValue>
                    Normal
                  </option>
                  <option value="important">Important</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control shadow-none"
                  name="date"
                  id=""
                  placeholder="dd-mm-yy"
                  onChange={(e) => formInput(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control shadow-none"
                  name="des"
                  id=""
                  rows="3"
                  onChange={(e) => formInput(e)}
                ></textarea>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary w-100"
                  name="formSubmit"
                  onClick={submitForm}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
