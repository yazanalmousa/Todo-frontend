import React, { useEffect, useState, useRef } from "react";
import "../todo.css";
import axios from "axios";
import { UserEmail } from "../helper/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo() {
  const inputRef = useRef("");
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [done, setDone] = useState([]);
  const { userEmail, setUserEmail } = React.useContext(UserEmail);

  const handleChange = (e) => {
    setTodoText(e.target.value);
    console.log(todoText, "-----------------------------------");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTodos([...todos, { text: todoText, isDone: false }]);
    inputRef.current.focus();
    try {
      if (todoText.trim() === "") {
        toast.error("Please Enter Something");
        return;
      }

      const newTodo = { title: todoText, userId: userEmail };

      const response = await axios.post("http://localhost:3001/todos", newTodo);

      // Handle successful response
      console.log(response.data);

      setTodos([...todos, { text: todoText, isDone: false }]);
      setTodoText("");
      setDone([...done, false]);
    } catch (error) {
      // Handle error
      console.error("Error while submitting todo:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server responded with error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
    }
  };

  useEffect(() => {
    console.log(todos, "useEffect");
  }, [todos]);

  useEffect(() => {
    if (userEmail === "") {
      toast.error("Please Login First");
      navigate("/");
    }
  });

  const handleDone = (index) => {
    const updatedDone = [...done];
    updatedDone[index] = !updatedDone[index];
    setDone(updatedDone);
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);

    const updatedDone = [...done];
    updatedDone.splice(index, 1);
    setDone(updatedDone);

    console.log(todos,"todos after deleted");
    
  };
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/todos?userId=${userEmail}`
        );
        const fetchedTodos1 = response.data;
        console.log(fetchedTodos1, "fetchedTodos");
        fetchedTodos1.map((item) => {
          setTodos([...todos, { text: item.title, isDone: false }]);
        });
      } catch (error) {
        console.error("Error while fetching todos:", error);
        // Handle error (e.g., display an error toast)
        toast.error("Error fetching todos. Please try again.");
      }
    };

    fetchTodos();
  }, []);

  return (
    <div id="container-todo" className="container p-3 my-3 bg-dark text-white">
      <h1 className="title">Your To-Do App</h1>
      <div className="inputs-items">
        <input
          ref={inputRef}
          id="text-input"
          className="input-todo"
          type="text"
          placeholder="Add your todo . . . "
          value={todoText}
          onChange={handleChange}
        />
        <button
          id="todo-btn"
          type="button"
          className="btn btn-secondary"
          onClick={handleSubmit}
        >
          <span>
            <i id="add-btn" class="fa-solid fa-plus"></i>
          </span>
        </button>
      </div>
      <div className="actual-todo">
        <ul className="todo-list">
          {todos.map((item, index) => (
            <li key={index} className="list-items">
              <span className={done[index] ? "item-style" : "item-style1"}>
                {item.text}
              </span>
              <span>
                <i
                  onClick={() => handleDone(index)}
                  class="fa-solid fa-check"
                ></i>
                <i
                  onClick={() => handleDelete(index)}
                  class="fa-solid fa-trash"
                ></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
