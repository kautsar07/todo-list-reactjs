import React, { useState, useEffect} from "react";
import "./Updtask.css";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "antd";

import axios from "axios";



export default function Updtask(props) {
  const [edit, setEdit] = useState({
    task: "",
  });

  const { id } = useParams();


  const loadTask = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/Task/${id}`);
      setEdit(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  useEffect(() => {
    loadTask();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {

    setEdit ( {...edit, [e.target.name]: e.target.value} )
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3000/Task/${id}`, edit).then((res) => {
      alert("Berhasil mengubah task");
    });

    navigate("/");
    setEdit({ task: ""});
  };


  return (
    <div className="task">
      <div className="Add">
        <h1>TodoInput </h1>
        <form onSubmit={handleSubmit} className="form">
          <Input
            type="text"
            name="task"
            value={edit.task}
            onChange={(e) => handleChange(e)}
            className="input"
          />
          <button type="submit" className="submit">
            Edit Task
          </button>
        </form>
      </div>
    </div>
  );
}
