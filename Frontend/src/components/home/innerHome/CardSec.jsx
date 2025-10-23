import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import "../homeCss/card.css";
import { UseAppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const CardSec = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const { foodItems, token, categoriesname, setCategoriesname, setCartData } =
    UseAppContext();
  const [rating] = useState(4);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    if (categoriesname) {
      let items = foodItems.filter((fd) => fd.category == categoriesname);
      setFoodData(items);
    }

    const id = setTimeout(()=>{
      setCategoriesname("");
      setFoodData([]);
    },30000);

    return () => clearTimeout(id);

  }, [categoriesname, foodItems]);

  console.log(foodData);

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

  if (!foodItems) return <h2>Loading...</h2>;

  // Motion variants for scroll-based reveal
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const data = foodData.length ? foodData : foodItems;

  return (
    <div className="food-grid">
      {data.map((food, index) => (
        <Link to={`/details/${food._id}`}>
          <motion.div
            onClick={() => console.log(food._id)}
            key={food._id}
            className="food-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1 }} // slight stagger on scroll
          >
            <div className="food-img">
              <img
                src={
                  food.image.startsWith("https")
                    ? food.image
                    : `${url}/images/${food.image}`
                }
                alt={food.name}
              />

              {/* <div className="cart-btns">
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
            </div>

            <div className="food-details">
              <h3>{food.name}</h3>
              <p>
                Food provides essential nutrients for overall health and
                well-being
              </p>
              <div className="food-footer">
                <span className="price">${food.price}</span>
                <div className="stars">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <span key={i}>
                        {i < rating ? (
                          <FaStar color="orange" />
                        ) : (
                          <CiStar color="orange" />
                        )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default CardSec;
