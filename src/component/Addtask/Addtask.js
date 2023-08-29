import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./task.css";
import { Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import datas from '../Dummy/index'

export default function Addtask() {
  const [tasks, setTask] = useState([]);
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setTask(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { id: uuidv4(), task: tasks, completed: false };
    // console.log(data);
    datas.unshift(data)
    // console.log(datas);
    navigate('/')


  

    // let data = [...tasks];

    // if (formData === "") {
    //   return false;
    // } else {
    //   let toSave = {
    //     id: Math.random() * 100,
    //     task: formData,
    //     complete: false,
    //   };
    //   data.push(toSave);

    //   // menambahkan data
    //   axios.post("http://localhost:3000/Task", toSave).then(() => {
    //     alert("Data berhasil ditambah");
    //   });
    // }

    // setTask(data);

    // setFormData({ task: "" });

    // navigate("/");
  }
  const back = () => {
    navigate("/");
  };

  return (
    <div className="task">
      <div className="Add">
        <h1>TodoInput</h1>
        <form onSubmit={handleSubmit} className="form">
          <Input
            type="text"
            onChange={(e) => handleChange(e.target.value)}
            className="input"
            name="name"
            placeholder="Input your task"
            required
          />
          <div className="add-btn">
            <button className="submit">Submit</button>
            <button className="cancel" onClick={back}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
