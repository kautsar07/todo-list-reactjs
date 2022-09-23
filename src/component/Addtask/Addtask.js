import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./task.css";
import { Input } from "antd";
import { uid } from "uid";
import axios from "axios";


export default function Addtask() {
  const [tasks, setTask] = useState([]);
 
  const [formData, setFormData] = useState({
    task:""
  });

  function handleChange(e) {

    setFormData(e.target.value);
  }
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...tasks];

    if (formData === "") {
      return false;
    }
   else {
   
    let toSave = {
      id: Math.random()*100,
      task: formData,
      complete: false
    };
    data.push(toSave);

    // menambahkan data
    axios.post("http://localhost:3000/Task", toSave).then(() => {
      alert("Data berhasil ditambah");
    });
    

    }
  
    setTask(data);

    setFormData({ task: ""});

    navigate("/")
  }
    
 

  // const [formData, setFormData] = useState({
  //   task: ""
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   alert('oke')

  //   let data = [...task]

  //   data.push({
  //     id:uid(),
  //     task: formData.name,
  //     complete: false
  //   })
  //   setTask(data)

  // }

  // const handleChange = (e) => {
  //   let data = { ...task };
  //   data[e.target.name] = e.target.value;
  // };

  // const navigate = useNavigate()

  // const addTask = (e) => {
  //   e.preventDefault()
  //   const newTask = {
  //     id: uid(),
  //     task: formData.name,
  //     complete: false,
  //   };
  //   setTask((data) => [...data, newTask]);
  //   navigate("/")
  //   alert("oke")
  // };

  return (
    <div className="task">
      <div className="Add">
        <h1>TodoInput</h1>
        <form onSubmit={handleSubmit} className="form">
          <Input
            type="text"
            value={formData.task}
            onChange={handleChange}
            className="input"
            name="name"
            placeholder="Input your task"
            required
          />
          <button  className="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
