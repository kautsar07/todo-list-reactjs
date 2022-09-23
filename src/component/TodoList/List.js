import React, { useState, useEffect, useParams } from "react";
import "./List.css";
import Todolist from "./Todolist";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input, Space } from "antd";
import { uid } from "uid";
import "./Search.css";

export default function List() {
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

  const handleDelete = (id) => {
    let data = [...tasks];
    let filteredData = data.filter((item) => item.id !== id);

    axios.delete("http://localhost:3000/Task/" + id).then(() => {
      alert("Data berhasil dihapus");
    });
    setTask(filteredData);
  };

  const handleDelDone = () => {
    let data = [...tasks];
    let filteredData = data
      .filter((task) => task.complete === true)
      .map((filtertask) => {
        return axios
          .delete(`http://localhost:3000/Task/${filtertask.id}`)
          .then(() => {
            alert("Data berhasil dihapus");
          });
      });
    setTask(filteredData);
  };
  const handleDelAll = () => {
    let data = [...tasks];
    let filteredData = data.map((filtertask) => {
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
      if (task.id === id) {
        if (task.complete === false) {
          return { ...task, complete:!task.complete };
        }
      }
      return task;
    });
    console.log(newValue);
    setTask(newValue);
  };

  const { Search } = Input;

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <h1>Todo Search</h1>
      <div className="Main-search">
        <div className="input">
          <Search
            enterButton
            placeholder="Search Todo"
            onChange={(e) => setSearchTerm(e.target.value)}
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
            .filter((item) => {
              if (searchTerm === "") {
                return item;
              } else if (
                item.task.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item, key) => (
              <article>
                {/* <Todolist style={{textDecoration:"line-through"}} name={item.task} /> */}
                <div>
                  <div
                    style={
                      item.complete ? { textDecoration: "line-through 1px red" } : null
                    }
                    className="name"
                  >
                    {item.task}
                  </div>
                </div>

                <div className="atribut">
                  <input
                    type="checkbox"
                    checked={item.complete}
                    className="check"
                    onChange={() => handleCheck(Number(item.id))}
                  />

                  <Link to={`/Updtask/${item.id}`}>
                    <FaPencilAlt className="edit" />
                  </Link>

                  <MdDelete
                    className="del"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </article>
            ))}
        </div>

        <div className="delete">
          <button className="btn-delete" onClick={handleDelDone}>
            Delete done task
          </button>
          <button className="btn-delete" onClick={handleDelAll}>
            Delete all task
          </button>
        </div>
      </div>
    </>
  );
}
