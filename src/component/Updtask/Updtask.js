import React, { useState, useEffect, useParams } from "react";
import "./Updtask.css";
import { Input } from "antd";
import { uid } from "uid";
import axios from "axios";
import Todolist from "../TodoList/Todolist";

export default function Updtask(props) {
  const [tasks, setTask] = useState([]);
  const [edit, setEdit] = useState()

  const loadTask = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks");
      setTask(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);


//  const handleEdit = (id) => {
//   const taskPilih = tasks.filter((task)=> task.id === id).map((filtertask)=>{
//     return filtertask
//   })
//   setEdit({
//     task: taskPilih[0].task,
//     id: taskPilih[0].id
//   })
//   console.log(taskPilih)
//  }
  return (
    <div className="task">
      <div className="Add">
        <h1>TodoInput </h1>
        {/* {tasks.map((task, index) => {
          return ( */}
            {/* <div className="form">
              <Input type="text" className="input" value={props} name="name" />
              <button type="submit" className="submit">
                done
              </button>
            </div> */}
          {/* );
        })} */}
      </div>
    </div>
  );
}
