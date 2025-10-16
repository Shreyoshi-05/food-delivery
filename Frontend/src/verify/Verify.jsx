import React from 'react'
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Verify = () => {
  const url=import.meta.env.VITE_BACKEND_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  // console.log(success,orderId);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const res = await axios.post(`${url}/api/order/verify`,{success,orderId});
    console.log(res)
    if(res.data.success){
      navigate("/showorders")
    }else{
      navigate("/")
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[])

  return (
    <div className="verify">
      <div className="spinner">
        <div className="spinner-inner"></div>
      </div>
    </div>
  )
}

export default Verify