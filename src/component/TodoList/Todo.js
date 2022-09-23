import React, { useState, useEffect } from "react";
import "./List.css";
import "./App.css";
import Todolist from "./Todolist";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Input } from "antd";

import "./Search.css";

export default function Todo() {
  const [tasks, setTask] = useState([]);
  // const [edit, setEdit] = useState();

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

  // const handleEdit = (id) => {
  //   const taskPilih = tasks
  //     .filter((task) => task.id === id)
  //     .map((filtertask) => {
  //       return filtertask;
  //     });
  //   setEdit({
  //     task: taskPilih[0].task,
  //     id: taskPilih[0].id,
  //   });
  //   console.log(taskPilih);
  // };

  const handleDelAll = () => {
    let data = [...tasks];
    let filteredData = data.filter((task) => task.complete === false).map((filtertask) => {
      return axios
        .delete(`http://localhost:3000/Task/${filtertask.id}`)
        .then(() => {
          alert("Data berhasil dihapus");
        });
    });
    setTask(filteredData);
  };
  const handleCheck = (id) => {
    const newValue = tasks.map((task) => {
      if (task.id === Number(id)) {
        if (task.complete === false) {
          return { ...task, complete: !task.complete };
        }
      }
      return task;
    });
    console.log(newValue);
    setTask(newValue);
  };

  const handleDelete = (id) => {
    let data = [...tasks];
    let filteredData = data.filter((item) => item.id !== id);

    axios.delete("http://localhost:3000/Task/" + id).then(() => {
      alert("Data berhasil dihapus");
    });
    setTask(filteredData);
  };
  const { Search } = Input;

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <div className="Main">
        <h1>Todo Search</h1>
        <div className="Main-search">
          <div className="input">
            <Search
              enterButton
              placeholder="Search Todo"
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button>search</button>
          </div>
          <div className="add">
            <Link to="/addtask">
              <button>Add new task</button>
            </Link>
          </div>
        </div>
        <h1>Todo List</h1>

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
              .filter((item) => item.complete === false)
              .filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item.task.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((filteritem) => {
                return (
                  <article>
                    <div>
                      <div
                        style={
                          filteritem.complete
                            ? { textDecoration: "line-through 1px red" }
                            : null
                        }
                        className="name"
                      >
                        {filteritem.task}
                      </div>
                    </div>

                    <div className="atribut">
                    <input
                        type="checkbox"
                        checked={filteritem.complete}
                        className="check"
                        onChange={() => handleCheck(filteritem.id)}
                      />

                      <Link to={`/Updtask/${filteritem.id}`}>
                        <FaPencilAlt className="edit" />
                      </Link>

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
          <button className="btn-delete" onClick={handleDelAll}>
            Delete all task
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// const handleDelete = (id) => {
//   let data = [...tasks];
//   let filteredData = data.filter((item) => item.id !== id);

//   axios.delete("http://localhost:3000/Task/" + id).then(() => {
//     alert("Data berhasil dihapus");
//   });
//   setTask(filteredData);
// };

//   const handleDone = () => {
//     const done = tasks
//       .filter((task) => task.complete === true)
//       .map((filtertask) => {
//         return filtertask;
//       });
//   };
//   const handleTodo = () => {
//     const todo = tasks
//       .filter((task) => task.complete === false)
//       .map((filtertask) => {
//         return filtertask;
//       });
//   };
//   const handleAll = () => {
//     const all = tasks.map((task) => task.task);
//     console.log(all);
//   };

// {/* <article>
//               <div className="name">{filteritem.task}</div>
//               <div className="atribut">
//                 <input type="checkbox" className="check" />

//                 <Link to="/Updtask">
//                   <FaPencilAlt onClick={() => handleEdit()} className="edit" />
//                 </Link>
//                 <MdDelete className="del" />
//               </div>
//             </article>
//             ; */}
