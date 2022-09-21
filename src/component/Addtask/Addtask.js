import React, {useState} from "react";
import "./task.css";
import { Input } from "antd";
import { uid } from "uid";
import axios from 'axios'



export default function Addtask() {

  const [task, setTask] = useState([]);
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    let newFormState = { ...formData };
    newFormState[e.target.name] = e.target.value;
    setFormData(newFormState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...task];

    if (formData.name === "") {
      return false;
    }
    // if (formData.complete === "") {
    //   return false;
    // }

    // if (isUpdate.status) {
    //   data.forEach((task) => {
    //     if (task.id === isUpdate.id) {
    //       task.task = formData.name;
    //       // task.complete = formData.complete;
    //     }
    //   });
      // axios.put(`http://localhost:3000/task/${isUpdate.id}`).then((res) =>{
      //   alert("Berhasil mengubah task")
      // })
     else {
      if(formData.nama === null){
        alert("You must input your assignment")
      }else{
      let toSave = {
        id: uid(),
        task: formData.name,
        complete: false
      };
      data.push(toSave);

      // menambahkan data
      axios.post("http://localhost:3000/Task", toSave).then(() => {
        alert("Data berhasil ditambah");
      });
    }

      
      
    }
    setTask(data);
    setIsUpdate(false);
    setFormData({ name: ""});
  }
  

  return (
    <div className="task">
      <div className="Add">
        <h1>TodoInput</h1>
        <form onSubmit={handleSubmit} className="form">
          <Input type="text" onChange={handleChange} className="input" value={formData.name} name="name" placeholder="Input your task" />
          <button type="submit" className="submit">Submit</button>
        </form >
      </div>
    </div>
  );
}
