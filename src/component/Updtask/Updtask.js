import React, { useState, useEffect } from "react";
import "./Updtask.css";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "antd";
import datas from "../Dummy/index";

export default function Updtask() {
  const [task, setTask] = useState(datas);
  const [update, setUpdate] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setUpdate(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValue = task.map((item) => {
      if (item.id === id) {
        item.task = update;
        return item
      }
      // return item;
      return { ...item };
    });

    navigate('/')
  };

  return (
    <div className="task">
      <div className="Add">
        <h1>TodoInput </h1>
        {task
          ?.filter((item) => item.id === id)
          .map((item) => (
            <form onSubmit={handleSubmit} className="form">
              <Input
                type="text"
                name="task"
                // value={item.task}
                onChange={(e) => handleChange(e.target.value)}
                className="input"
              />
              <div className="btn-update">
                <button onClick={handleSubmit} type="submit" className="submit">
                  Edit Task
                </button>
                <button
                  onClick={() => navigate("/")}
                  type="submit"
                  className="cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          ))}
      </div>
    </div>
  );
}
