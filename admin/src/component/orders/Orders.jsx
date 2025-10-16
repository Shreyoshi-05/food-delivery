import React from "react";
import "./orders.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import Loding from "../loding/Loding";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL

  const fetchAllOrders = async (req, res) => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.orderlist);
      } else {
        toast.error(res.data.messsage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  function getTotalQuantity(item) {
    return item.items.reduce((total, item) => total + item.quantity, 0);
  }

  function getTotalPrice(item) {
    return item.items.reduce((total, item) => total + item.price, 0);
  }

  async function handelSelect(e, id) {
    try {
      const res = await axios.post(`http://localhost:4000/api/order/status`, {
        orderId: id,
        status: e.target.value,
      });
      console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!orders) {
    return <Loding />;
  }

  return (
    <div className="show_order">
      <h2>Order Page</h2>
      <div className="oreder_container">
        {orders.map((item) => {
          return (
            <div className="orders" key={item._id}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/679/679922.png"
                alt="box"
              />
              <p className="items">
                {item.items.map((pro) => (
                  <div>
                    {pro.name} x {pro.quantity},
                  </div>
                ))}
              </p>

              <span>${getTotalPrice(item)}</span>
              <span>Items:{getTotalQuantity(item)}</span>
              <span>
                <span class="dot"></span> Food Processing
              </span>
              <select
                class="track-btn"
                name=""
                id="opt"
                onClick={(e) => handelSelect(e, item._id)}
              >
                <option value="Food_processing">Food Processing</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="processing">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
