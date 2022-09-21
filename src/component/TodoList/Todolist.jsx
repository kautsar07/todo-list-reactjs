import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./List.css";
import { uid } from "uid";
import axios from "axios";

export default function Todolist(props) {
  return (
    <div>
      <div className="name">{props.name}</div>
    </div>
  );
}
// {/* <div className="atribut">
//   <input type="checkbox" className="check" />

//   <FaPencilAlt className="edit" />

//   <MdDelete className="del" />
// </div>; */}
