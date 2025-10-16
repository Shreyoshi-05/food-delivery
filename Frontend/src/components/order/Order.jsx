import React, { useEffect, useState } from "react";
import "./order.css";
import { UseAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate}  from 'react-router-dom'

const Order = () => {
  const url=import.meta.env.VITE_BACKEND_URL;
  const { foodItems, cartdata ,token,totalAmount} = UseAppContext();

  const [data, setData] = useState({
    firstname: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  function handelValue(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    let orderItems = [];
    foodItems.map((item) => {
      if (cartdata[item._id] > 0) {
        let itemInfo = {};
        itemInfo["name"] = item.name,
        itemInfo["price"] = Number(item.price),
        itemInfo["quantity"] = cartdata[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      adress:data,
      items:orderItems,
      amount: totalAmount + 2,
      // gettotalCartAmount()+2
    }
    let response = await axios.post(`${url}/api/order/place`,orderData,{headers:{token}});
    console.log(response)

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }else{
      toast.error(response.data.message)
    }
  }

  const navigate = useNavigate();

useEffect(() => {
  if (!token || totalAmount === 0 || Object.keys(cartdata).length === 0) {
    navigate("/cart");
  }
}, [token, totalAmount, cartdata, navigate]);

  return (
    <form onSubmit={handelSubmit} class="checkout-container">
      <div class="delivery-info">
        <h2>Delivery Information</h2>
        <div class="row">
          <input
            required
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handelValue}
            placeholder="First name"
          />
          <input
            required
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handelValue}
            placeholder="Last name"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          value={data.email}
          onChange={handelValue}
          placeholder="Email address"
        />
        <input
          required
          type="text"
          name="street"
          value={data.street}
          onChange={handelValue}
          placeholder="Street"
        />
        <div class="row">
          <input
            required
            type="text"
            name="city"
            value={data.city}
            onChange={handelValue}
            placeholder="City"
          />
          <input
            required
            type="text"
            name="state"
            value={data.state}
            onChange={handelValue}
            placeholder="State"
          />
        </div>

        <div class="row">
          <input
            type="text"
            name="zipcode"
            value={data.zipcode}
            onChange={handelValue}
            placeholder="Zip code"
          />
          <input
            type="text"
            name="country"
            value={data.country}
            onChange={handelValue}
            placeholder="Country"
          />
        </div>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={handelValue}
          placeholder="Phone"
        />
        <button></button>
      </div>

      <div class="cart-totals">
        <h2>Cart Totals</h2>
        <div class="cart-row">
          <span>Subtotal</span>
          <span>$222</span>
        </div>
        <div class="cart-row">
          <span>Delivery Fee</span>
          <span>$2</span>
        </div>
        <div class="cart-row total">
          <span>Total</span>
          <span>$224</span>
        </div>
        <button type="submit" class="proceed-btn">
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default Order;
