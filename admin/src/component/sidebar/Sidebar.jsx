import React from 'react'
import './sidebar.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="sidebar">
      <Link to="/" className={location.pathname == '/' ?"active":"items"}>
        <AiOutlinePlusCircle size={33}/>
        <p>Add Items</p>
      </Link>

      <Link to="/list" className={location.pathname == '/list' ?"active":"items"}>
        <RiFileList3Line size={33}/>
        <p>List Items</p>
      </Link>

      <Link to="/orders" className={location.pathname == '/orders' ?"active":"items"}>
        <FaListCheck size={32}/>
        <p>Orders</p>
      </Link>
    </div>
  )
}

export default Sidebar