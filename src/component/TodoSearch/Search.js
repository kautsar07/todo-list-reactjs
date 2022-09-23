// import React, {useState, useEffect} from "react";
// import { AudioOutlined } from "@ant-design/icons";
// import "./Search.css";
// import { Input, Space } from "antd";
// import { Link } from "react-router-dom";
// import axios from 'axios'

// export default function Search() {
//   const { Search } = Input;
//   // const onSearch = (value) => console.log(value);
//   const [tasks, setTask] = useState([]);

//   const loadTask = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/Task");
//       setTask(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     loadTask();
//   }, []);

//   const [searchInput, setSearchInput] = useState('');
  
//   const searchItems = (searchValue) => {
//     setSearchInput(searchValue)
// }
//   return (

//     <div className="Main-search">
//       <div className="input">
//         <Search enterButton placeholder="Search Todo" />
//         <button onChange={(e) => searchItems(e.target.value)} >search</button>
//       </div>
//       <div className="add">
//         <Link to="/addtask">
//           <button>Add new task</button>
//         </Link>
//       </div>
//     </div>
//   );




// }
