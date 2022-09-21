import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import "./Search.css";
import { Input, Space } from "antd";
import { Link } from "react-router-dom";

export default function Search() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  // const suffix = (
  //   <AudioOutlined
  //     style={{
  //       fontSize: 16,
  //       background: "#42f584",
  //     }}
  //   />
  // );
  return (
    <div className="Main-search">
      <div className="input">
        <Search enterButton placeholder="Search Todo" onSearch={onSearch} />
        <button>search</button>
      </div>
      <div className="add">
        <Link to="/addtask">
          <button>Add new task</button>
        </Link>
      </div>
    </div>
  );
}
