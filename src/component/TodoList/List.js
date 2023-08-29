import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Input } from "antd";
import data from "../Dummy/index";
import "./Search.css";

export default function List() {
  const [tasks, setTask] = useState(data);
  const [filter, setFilter] = useState(data.length)
  const [done, setDone] = useState(false)
  const [todo, setTodo] = useState(false)

  const handleDelete = (id) => {
    console.log(id);
    setTask( tasks.filter((item)=> item.id !== id))
      // setTask({...item})
   
    // console.log(del);
  };
  console.log(tasks);

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

  const handleCheck = (e) => {
    setTask(
      data.map((item) => {
        if (item.id === e && item.completed === false) {
          item.completed = true;
          return item;
        }
        if (item.id === e && item.completed === true) {
          item.completed = false;
          return item;
        }
        return { ...item };
      })
    );
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
          <div className="button" onClick={()=>setTask(data)}>
            All
          </div>

          <div className="button" onClick={()=>setTask(data.filter((item)=>item.completed===true? {...item}:null))}>
            Done
          </div>

          <div className="button" onClick={()=>setTask(data.filter((item)=>item.completed===false? {...item}:null))}>
            Todo
          </div>
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
                <p
                  key={key}
                 
                  className={`${item.completed ? "name2" : "name1"}`}
                >
                  {item.task}
                </p>

                <div className="atribut">
                  <input  onClick={() => handleCheck(item.id)} type="checkbox" checked={item.completed}>
                  </input>
                  <Link to={`/Updtask/${item.id}`}>
                    <FaPencilAlt className="edit" />
                  </Link>

                  <MdDelete className="del" onClick={() => handleDelete(item.id)} />
                </div>
              </article>
            ))}
        </div>

        <div className="delete">
          <button className="btn-delete" onClick={()=>setTask(data.filter((item)=> item.completed===false))}>
            Delete done task
          </button>
          <button className="btn-delete" onClick={()=>setTask(data.filter((item)=> item.completed===false && item.completed===true))}>
            Delete all task
          </button>
        </div>
      </div>
    </>
  );
}
