import logo from "./logo.svg";
import "./App.css";
import Search from "./component/TodoSearch/Search";
import 'antd/dist/antd.css'
import List from "./component/TodoList/List";
import axios from 'axios'
import React, {useEffect} from "react";



function App() {
  return (
    <div className="App">
      <div className="Main">
        <h1>TodoSearch</h1>
        <Search />
        <h1>TodoList</h1>
        <List/>
      </div>
    </div>
  );
}

export default App;
