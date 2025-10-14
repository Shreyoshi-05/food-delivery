import React, { useState } from "react";
import "./add.css";
import { SlCloudUpload } from "react-icons/sl";
import { toast } from "react-toastify";
import axios from 'axios'

const Add = () => {
  const [hasimg, setHasimg] = useState(false);
  const [img, setImage] = useState(null);
  
  function handelImageUplad(e) {
    console.log(e);
    const pic = e.target.files[0];

    if (pic) {
      setImage(pic);
      setHasimg(true);
    }
  }
   const categories = [
  {
    name: "Salad",
    image: "https://i.pinimg.com/736x/77/3e/b5/773eb587e9a5d044a3679f64acdf9e1d.jpg"
  },
  {
    name: "Roll",
    image: "https://i.pinimg.com/1200x/fe/c9/8d/fec98d2ce04894b03cf5d039e52d59cf.jpg"
  },
  {
    name: "Dessert",
    image: "https://i.pinimg.com/1200x/d9/34/e0/d934e03fadfb35bf5fd23633a65fb047.jpg"
  },
  {
    name: "Sandwich",
    image: "https://i.pinimg.com/736x/30/c8/6f/30c86fabc356ebc00c1908cbddd3f795.jpg"
  },
  {
    name: "Cake",
    image: "https://i.pinimg.com/1200x/ad/9d/17/ad9d179d29a1c33978878e544f5f9b1f.jpg"
  },
  {
    name: "Pure Veg",
    image: "https://i.pinimg.com/1200x/68/64/1d/68641d0c9c9fa62a43508f2b246e1be3.jpg"
  },
  {
    name: "Pasta",
    image: "https://i.pinimg.com/1200x/4b/3f/d0/4b3fd0ae79db8d8880d70d1d54b156f5.jpg"
  },
  {
    name: "Noodles",
    image: "https://i.pinimg.com/1200x/ed/8e/83/ed8e8380de566fd54a702f68102b4c49.jpg"
  }
];
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 100,
    category: "Salad",
  });


  function handelSaveData(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({...data,[name]:value})
  }

  async function handelAddData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",data.price)
    formData.append("category",data.category)
    formData.append("image",img)

    const ans = await axios.post(`http://localhost:4000/api/food/add`,formData);
    console.log(ans);

    if(ans.data.success){
       setData({
        name: "",
        description: "",
        price: null,
        category: "",
      });
      setImage(null);
      setHasimg(false);
      toast.success(ans.data.message);
    }else{
      toast.error(ans.data.message)
    }
  }


  return (
    
    <form onSubmit={handelAddData} action="" className="add">
      <div className="sec">
        <p>Upload Image</p>
        {hasimg ? (
          <img src={URL.createObjectURL(img)} alt="" className="uploded_img" />
        ) : (
          <div className="img_container">
            <label htmlFor="img" className="uploed-con">
              <input
                type="file"
                id="img"
                accept="image/*"
                onChange={handelImageUplad}
                hidden
              />
              <SlCloudUpload size={39} />
            </label>
          </div>
        )}
      </div>

      <div className="sec">
        <p>Product Name</p>
        <input
          value={data.name}
          onChange={handelSaveData}
          type="text"
          name="name"
          id=""
        />
      </div>

      <div className="sec">
        <p>Product Description</p>
        <textarea
          value={data.description}
          onChange={handelSaveData}
          name="description"
          id=""
        ></textarea>
      </div>

      <div className="t_sec">
        <div>
          <label htmlFor="food">Product Category</label>
          <select
            value={data.category}
            onChange={handelSaveData}
            name="category"
            id=""
          >
            {categories.map((item) => {
              return <option value={item.name}>{item.name}</option>;
            })}
          </select>
        </div>

        <div>
          <label>Product Price</label>
          <input
            type="number"
            value={data.price}
            onChange={handelSaveData}
            name="price"
          />
        </div>
      </div>

      <button >Add</button>
    </form>
  );
};

export default Add;
