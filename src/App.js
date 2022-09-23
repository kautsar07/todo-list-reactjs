import "./App.css";
import "antd/dist/antd.css";
import List from "./component/TodoList/List";
import React from "react";

function App() {
  return (
    <div className="App">
      <div className="Main">
        <List />
      </div>
    </div>
  );
}

export default App;
