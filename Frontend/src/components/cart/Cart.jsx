import React, { useEffect, useState } from "react";
import "./Cart.css";
import { UseAppContext } from "../context/AppContext";
import Loding from "../loding/Loding";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const url=import.meta.env.BACKEND_URL;
  const [cartItems, setCartItems] = useState([]);
  const { cartdata, foodItems } = UseAppContext();
  const location = useNavigate();

  function getCartItems(){
    let arr = [];
    foodItems.forEach((item) => {
      if(cartdata[item._id]>0){
        arr.push({...item,quantity:cartdata[item._id]})
      }
    })
    setCartItems(arr);
  }

  useEffect(()=>{
    if(cartdata&& foodItems){
      getCartItems();
    }
  },[cartdata, foodItems]);




  return <div className="cart_container">
    <table className="cart-table">
        <thead>
          <tr>
            <th>Items</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
              </td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
              <td className="remove-btn">x</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="payment_sec">
        <div className="proceed">
          <h2>Cart Total</h2>
          <div className="part">
            <p>Subtotal</p>
            <p>$30</p>
          </div>
          <div className="part">
            <p>Delivery Fee</p>
            <p>$3</p>
          </div>
          <div className="part">
            <p>Total</p>
            <p>$32</p>
          </div>
          <button onClick={()=>location("/order")}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="code">
          <p>
            if you have a promo code, Enter it here
          </p>
          <div className="input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>

  </div>;
};

export default Cart;
