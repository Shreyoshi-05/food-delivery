import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvidor = ({ children }) => {
  const url=import.meta.env.BACKEND_URL;
  const [isSignin, setIsSignin] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [token, setToken] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [cartdata, setCartData] = useState({});
  const [totalAmount , setTotalAmount] = useState(null);
  const categories = [
    {
      name: "Salad",
      image:
        "https://i.pinimg.com/736x/77/3e/b5/773eb587e9a5d044a3679f64acdf9e1d.jpg",
    },
    {
      name: "Roll",
      image:
        "https://i.pinimg.com/1200x/fe/c9/8d/fec98d2ce04894b03cf5d039e52d59cf.jpg",
    },
    {
      name: "Dessert",
      image:
        "https://i.pinimg.com/1200x/d9/34/e0/d934e03fadfb35bf5fd23633a65fb047.jpg",
    },
    {
      name: "Sandwich",
      image:
        "https://i.pinimg.com/736x/30/c8/6f/30c86fabc356ebc00c1908cbddd3f795.jpg",
    },
    {
      name: "Cake",
      image:
        "https://i.pinimg.com/1200x/ad/9d/17/ad9d179d29a1c33978878e544f5f9b1f.jpg",
    },
    {
      name: "Pure Veg",
      image:
        "https://i.pinimg.com/1200x/68/64/1d/68641d0c9c9fa62a43508f2b246e1be3.jpg",
    },
    {
      name: "Pasta",
      image:
        "https://i.pinimg.com/1200x/4b/3f/d0/4b3fd0ae79db8d8880d70d1d54b156f5.jpg",
    },
    {
      name: "Noodles",
      image:
        "https://i.pinimg.com/1200x/ed/8e/83/ed8e8380de566fd54a702f68102b4c49.jpg",
    },
  ];
  
  

  async function getFood() {
    const url = `${url}/api/food/get`;

    try {
      const res = await axios.get(url);
      setFoodItems(res.data.data);
    } catch (error) {
      toast.error(error);
    }
  }

  async function getCartItems(tid) {
    try {
      const res = await axios.post(
        `${url}/api/cart/show`,
        {},
        { headers: { token: tid } }
      );
      if (res.data.success) {
        setCartData(res.data.cartData);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getData() {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      await getCartItems(localStorage.getItem("token"));
      await getFood();
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function getAmount() {
    foodItems.filter((item)=>{
      let price = 0;
      if(cartdata[item._id]>0){
        price += Number(item[price]) *cartdata[item._id]
      }
      setTotalAmount(price);
    })
  }

  // console.log("cartdata",cartdata);
  // console.log("foodItems",foodItems);

  useEffect(()=>{
    getAmount();
  },[cartdata])

  return (
    <AppContext.Provider
      value={{
        isSignin,
        setIsSignin,
        popupOpen,
        setPopupOpen,
        token,
        setToken,
        categories,
        foodItems,
        cartdata,
        setCartData,
        totalAmount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => {
  return useContext(AppContext);
};
