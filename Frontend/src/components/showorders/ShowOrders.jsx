import React, { useEffect, useState } from "react";
import "./Showorders.css";
import toast from "react-hot-toast";
import axios from "axios";
import { UseAppContext } from "../context/AppContext";
import Loding from "../loding/Loding";

const ShowOrders = () => {
  const url=import.meta.env.BACKEND_URL;
  const [lists, setLists] = useState([]);
  const { token } = UseAppContext();

  async function getOrderList() {
    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      console.log(res);

      if (res.data.success) {
        setLists(res.data.orders);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  console.log(lists);

  useEffect(() => {
    if (token) {
      getOrderList();
    }
  }, [token]);

  function getTotalQuantity(item){
    return item.items.reduce((total,item)=> total + item.quantity,0)
  };

  function getTotalPrice(item){
    return item.items.reduce((total,item)=> total + item.price,0)
  };

  // useEffect(()=>{
  //   getTotalQuantity();
  //   getTotalPrice();
  // },[lists])

  

  if (!lists) {
    return <Loding />;
  }

  return (
    <div className="show_order">
      <h2>My Orders</h2>
      <div className="oreder_container">
        {lists.map((item) => {
          return (
            <div className="orders" key={item._id}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/679/679922.png"
                alt="box"
              />
              <p className="items">
              {item.items.map((pro) => 
                
                  <div>{pro.name} x {pro.quantity},</div>
                
              )}
              </p>

              <span>${getTotalPrice(item)}</span>
              <span>Items:{getTotalQuantity(item)}</span>
              <span>
                <span class="dot"></span> {item.status}
              </span>
              <button class="track-btn" onClick={getOrderList}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowOrders;
