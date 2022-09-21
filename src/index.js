import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import Addtask from './component/Addtask/Addtask';
import Updtask from './component/Updtask/Updtask';
import Done from './component/TodoList/Done';
import Todo from './component/TodoList/Todo';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path = "/" element={<App />} />
    <Route path = "addtask" element={<Addtask />} />
    <Route path = "/Updtask" element={<Updtask />} />
    <Route path = "/Done" element={<Done />} />
    <Route path = "/Todo" element={<Todo />} />
    
  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
