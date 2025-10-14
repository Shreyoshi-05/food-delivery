import React from 'react'
import NavBar from './component/navbar/NavBar'
import Sidebar from './component/sidebar/Sidebar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from './component/add/Add'
import List from './component/list/List';
import Orders from './component/orders/Orders';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="sidebar_container">
        <Sidebar />
        <div className="main_content">
          <Routes>
            <Route path='/' element={<Add />} />
            <Route path='/list' element={<List />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
