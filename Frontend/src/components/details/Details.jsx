import React, { useEffect, useState } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { UseAppContext } from "../context/AppContext";
import Loding from "../loding/Loding";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const Details = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [btnClicked, setBtnClicked] = useState(false);
  const [cartitems, setCartItems] = useState(null)
  const { foodItems, token, cartdata, setCartData } = UseAppContext();

  const url = import.meta.env.VITE_BACKEND_URL;
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    if (foodItems && id) {
      const res = foodItems.find((food) => food._id === id);
      setFood(res);
    }
  }, [foodItems, id]);

  useEffect(()=>{
    if(id in cartdata){
      setCartItems(cartdata[id]);
    }
  },[id,cartdata]);

  function getTime(num) {
    let time = new Date();
    let year = time.getFullYear(num);
    let date = time.getDate(num);
    let month = time.getMonth(num);
    let fulldate = `${date}${shortMonths[month]} ${year}`;
    return fulldate;
  }

  const handleAdd = async (id) => {
    setCartData((pre) => ({ ...pre, [id]: (pre[id] || 0) + 1 }));
    try {
      const res = await axios.post(
        `${url}/api/cart/add`,
        { itemId: id },
        { headers: { token } }
      );

      res.data.success
        ? toast.success(res.data.message)
        : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemove = async (id) => {
    setCartData((pre) => ({ ...pre, [id]: pre[id] > 0 ? pre[id] - 1 : 0 }));
    try {
      const res = await axios.post(
        `${url}/api/cart/remove`,
        { itemId: id },
        { headers: { token } }
      );
      res.data.success
        ? toast.success(res.data.message)
        : toast.error(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  function handelAddToCart(){
    setBtnClicked(true);
  }
  console.log(cartitems)

  if (!food) {
    return <Loding />;
  }

  return (
    <div>
      {food && (
        <motion.div
          className="details-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="details-img"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={
                food.image.startsWith("https")
                  ? food.image
                  : `${url}/images/${food.image}`
              }
              alt="Food Name"
            />
          </motion.div>

          <motion.div
            className="details-content"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1>{food.name}</h1>
            <p className="details-category">Category: {food.category}</p>

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar style={{ color: "#ddd" }} />
            </div>

            <p className="details-description">{food.description}</p>

            <div className="price-section">
              <span className="price">${food.price}</span>
              <span className="time">Added on: {getTime(food.updatedAt)}</span>
            </div>
            {/* <div className="btn">
              {cartdata[food._id] > 0 ? (
                <div className="counter">
                  <button onClick={() => handleRemove(food._id)}>
                    <FaMinus /> 
                  </button>
                  <span style={{ color: "black" }}>{cartdata[food._id]}</span>
                  <button onClick={() => handleAdd(food._id)}>
                    <FaPlus />
                  </button>
                </div>
              ) : (
                <button onClick={() => handleAdd(food._id)} className="add-btn">
                  <FaPlus />
                </button>
              )}
            </div> */}

            <button className="btn" onClick={handelAddToCart}>
              {
                cartitems > 0 ? 
                <div className="count">
                  <button onClick={() => handleRemove(food._id)}><FaMinus /></button>
                  <span>{cartitems}</span>
                  <button onClick={() => handleAdd(food._id)}><FaPlus /></button>
                </div>
                :
                <div onClick={() => handleAdd(food._id)} className="count">
                  Add to Cart <FaPlus />
                </div>
              }
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Details;
