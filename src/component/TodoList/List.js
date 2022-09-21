import React, { useState, useEffect, useParams } from "react";
import "./List.css";
import Todolist from "./Todolist";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { uid } from "uid";

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
          return(
            axios.delete(`http://localhost:3000/Task/${filtertask.id}`).then(() => {alert("Data berhasil dihapus")})
          )
          })
    setTask(filteredData);
  };
  const handleDelAll = () => {
    let data = [...tasks];
    let filteredData = data.map((filtertask) => {
          return(
            axios.delete(`http://localhost:3000/Task/${filtertask.id}`).then(() => {alert("Data berhasil dihapus")})
          )
          })
    setTask(filteredData);
  };

  const handleCheck = (task) =>{
    let data = [...tasks];
    let filteredData = data.filter((item) => item.task === task);
    return(
      <h1>{filteredData}</h1>
    )
  }

  // const handleDone = () => {
  //   const done = tasks
  //     .filter((task) => task.complete === true)
  //     .map((filtertask) => {
  //       return filtertask;
  //     });
  //   console.log(done);
  // };
  // const handleTodo = () => {
  //   const done = tasks
  //     .filter((task) => task.complete === false)
  //     .map((filtertask) => {
  //       return filtertask;
  //     });
  //   console.log(done);
  // };
  // const handleAll = () => {
  //   const done = tasks.map((task) => task.task);
  //   console.log(done);
  // };

  return (
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
        {tasks.map((item) => (
          <article>
            <Todolist name={item.task} />

            <div className="atribut">
              <input type="checkbox" className="check" onClick={()=> handleCheck(item.task)} />

              <FaPencilAlt className="edit" />

              <MdDelete className="del" onClick={() => handleDelete(item.id)} />
            </div>
          </article>
        ))}
      </div>

      <div className="delete">
      <button className="btn-delete" onClick={handleDelDone}>Delete done task</button>
        <button className="btn-delete" onClick={handleDelAll}>Delete all task</button>
      </div>
    </div>
  );
}

// {/* <article>
//   <div className="name">{item.task}</div>
//   <div className="atribut">
//     <input type="checkbox" className="check" />

//     <Link to="/Updtask">
//       <FaPencilAlt onClick={() => handleEdit(item.id)} className="edit" />
//     </Link>
//     <MdDelete className="del" />
//   </div>
// </article>; */}
