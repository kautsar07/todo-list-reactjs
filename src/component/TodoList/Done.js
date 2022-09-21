import React, { useState, useEffect, useParams } from "react";
import "./List.css";
import "./App.css";
import Todolist from "./Todolist";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { uid } from "uid";
import Search from "../TodoSearch/Search";
import "./Search.css";

export default function Done() {
  const [tasks, setTask] = useState([]);
  const [edit, setEdit] = useState();

  const loadTask = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Task");
      setTask(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  const handleEdit = (id) => {
    const taskPilih = tasks
      .filter((task) => task.id === id)
      .map((filtertask) => {
        return filtertask;
      });
    setEdit({
      task: taskPilih[0].task,
      id: taskPilih[0].id,
    });
    console.log(taskPilih);
  };

  const handleDelete = (id) => {
    let data = [...tasks];
    let filteredData = data.filter((contact) => contact.id !== id);

    axios.delete("http://localhost:3000/Task/" + id).then(() => {
      alert("Data berhasil dihapus");
    });
    setTask(filteredData);
  };

  const handleDone = () => {
    const done = tasks
      .filter((task) => task.complete === true)
      .map((filtertask) => {
        return filtertask;
      });
  };
  const handleTodo = () => {
    const todo = tasks
      .filter((task) => task.complete === false)
      .map((filtertask) => {
        return filtertask;
      });
  };
  const handleAll = () => {
    const all = tasks.map((task) => task.task);
    console.log(all);
  };

  return (
    <div className="App">
      <div className="Main">
        <h1>TodoSearch</h1>
        <Search />
        <h1>TodoList</h1>

        <div className="container">
          <div className="btn">
            <Link className="button" to="/">
              All
            </Link>

            <Link className="button" to="/Done">
              Done
            </Link>

            <Link className="button" to="/Todo">
              Todo
            </Link>
          </div>

          <div>
            {tasks
              .filter((item) => item.complete === true)
              .map((filteritem) => {
                return (
                  <article>
                    <Todolist name={filteritem.task} />

                    <div className="atribut">
                      <input type="checkbox" className="check" />

                      <FaPencilAlt className="edit" />

                      <MdDelete
                        className="del"
                        onClick={() => handleDelete(filteritem.id)}
                      />
                    </div>
                  </article>
                );
              })}
          </div>

          <div className="delete">
            <button className="btn-delete">Delete all task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

//   <article>
//     <div className="name">{filteritem.task}</div>
//     <div className="atribut">
//       <input type="checkbox" className="check" />

//       <Link to="/Updtask">
//         <FaPencilAlt
//           onClick={() => handleEdit()}
//           className="edit"
//         />
//       </Link>
//       <MdDelete className="del" />
//     </div>
//   </article>
// );
