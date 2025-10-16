import React, { useEffect, useState } from "react";
import "./list.css";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../loding/Loding";

const List = () => {
  const url = import.meta.env.VITE_BACKEND_URL
  const[data,setData] = useState([])
  async function getFoodData() {
    try {
      const res = await axios.get(`${url}/api/food/get`);
      setData(res.data.data)
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getFoodData();
  }, []);

  if(!data){
    return <Loading />
  }
  async function handelRemove(id) {
    console.log(id)
    try {
      const ans = await axios.put(`http://localhost:4000/api/food/remove`,{id:id})
      getFoodData();
      toast.success(ans.data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div class="table-container">
      <h3>All Foods List</h3>
      <table class="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.filter(item => item && item.image).map((item,idx)=>{
              return(
                <tr key={idx}>
            <td>
              <img src={ `${url}/images/${item.image}`} alt={item.name} />
            </td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
            <td>
              <button class="delete-btn" onClick={()=>handelRemove(item._id)}>X</button>
            </td>
          </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default List;
