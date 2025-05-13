import "./App.css";
import { useState, useEffect } from "react";

async function createTodo(title) {
  try {
    const response = await fetch("http://127.0.0.1:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

async function getAll() {
  try {
    const response = await fetch("http://127.0.0.1:4000/todos");
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

async function updateStatus(id, status) {
  try {
    const jsonTodo = await fetch("http://127.0.0.1:4000/todos/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return await jsonTodo.json();
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteTodo(id) {
  try {
    await fetch("http://127.0.0.1:4000/todos/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return id;
  } catch (error) {
    console.log(error);
  }
}
function ToDo({ id, title, status, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="checkbox"
        checked={status}
        onChange={async () => await onToggle(id, status)}
      />
      <span className={status ? "task-text completed" : "task-text"}>
        {title}
      </span>
      <button className="delete-btn" onClick={async () => await onDelete(id)}>
        Delete
      </button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTodos = await getAll();
      setTodos(fetchedTodos);
    };

    fetchData();

    return () => {};
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const created = await createTodo(newTitle);
    if (created) {
      setTodos((prev) => [...prev, created]);
      setNewTitle("");
    }
  };

  const handleToggle = async (id, status) => {
    const updated = await updateStatus(id, status);
    if (updated) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, status: updated.status } : todo
        )
      );
    }
  };

  const handleDelete = async (id) => {
    const deletedId = await deleteTodo(id);
    if (deletedId) {
      setTodos((prev) => prev.filter((todo) => todo.id !== deletedId));
    }
  };

  return (
    <div className="container">
      <h1>To-do List</h1>
      <div className="input-container">
        <input
          type="text"
          id="taskInput"
          placeholder="Add new todo"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button id="addTaskBtn" onClick={handleAdd}>
          <i className="fas fa-plus"></i>Add
        </button>
      </div>
      <ul id="taskList">
        {todos.map((todo) => (
          <ToDo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            status={todo.status}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
