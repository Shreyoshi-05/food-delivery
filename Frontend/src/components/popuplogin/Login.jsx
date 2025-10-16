import React, { useState } from "react";
import "./Login.css";
import { UseAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const url=import.meta.env.VITE_BACKEND_URL;
  const[data,setData] = useState({
    "name":"",
    "email":"",
    "password":""
  })
  const { isSignin, setIsSignin ,setToken,popupOpen, setPopupOpen} = UseAppContext();

  function handelInput(e){
    console.log(e.target.name);
    setData({...data,[e.target.name]:e.target.value})
  }

  async function handelSignin(e) {
    e.preventDefault();
    if(!isSignin){
      try {
        const res = await axios.post(`${url}/api/user/register`,data);
        console.log(res)
        if(res.data.success){
          setIsSignin(true);
          setToken(res.data.token);
          localStorage.setItem("token",res.data.token);
          toast.success("user registered successfully");
          setPopupOpen(false);
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        toast(error.message)
      }

    }else{
      const res = await axios.post(`${url}/api/user/login`,data);
        console.log(res)
        if(res.data.success){
          setIsSignin(true);
          setToken(res.data.token);
          localStorage.setItem("token",res.data.token);
          toast.success("user registered successfully")
          setPopupOpen(false);
        }else{
          toast.error(res.data.message)
        }
    }
  }

  return (
    <div className="signin_page">
      <div className="constiner">
        <h1>{isSignin ? "Log In" : "Sign In"}</h1>
        <form action="" onSubmit={handelSignin}>
          {!isSignin && <input type="text" name="name" placeholder="name.." value={data.name} onChange={handelInput}/>}
          <input type="text" placeholder="email.." name="email" value={data.email} onChange={handelInput}/>
          <input type="password" placeholder="password.." name="password" value={data.password} onChange={handelInput}/>
          <button type="submit" >
            {isSignin ? "Log In" : "Sign In"}
          </button>
        </form>
        <h3 >{isSignin ? "New here? Register":"Sign in now " }</h3>
      </div>
    </div>
  );
};

export default Login;
