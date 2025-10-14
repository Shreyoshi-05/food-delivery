
import user from "../models/userModel.js";


export const addCartItems = async(req,res) =>{
  // req.body.userId
  try {
    let userdata = await user.findById(req.body.userId);
    let cartData = await userdata.cartData;
    if(!cartData[req.body.itemId]){
      cartData[req.body.itemId] = 1;
    }else{
      cartData[req.body.itemId] += 1;
    }
    await user.findByIdAndUpdate(req.body.userId,{cartData});
    return res.json({
      success:true,
      message:"cart item added"
    })

  } catch (error) {
    return res.json({
      message:error.message,
      succcess:false
    })
  }
}

export const removeCartItems =async(req,res)=>{
  try {
    let userdata = await user.findById(req.body.userId);
      

    let cartData = await userdata.cartData;
    if(cartData[req.body.itemId] >0){
      cartData[req.body.itemId] -= 1;
    }
    await user.findByIdAndUpdate(req.body.userId,{cartData});
    return res.json({
      success:true,
      message:"removed from cart"
    })

  } catch (error) {
    return res.json({
      message:error.message,
      succcess:false
    })
  }
}

export const showCartItems =async(req,res)=>{
  try {
    const userdata = await user.findById(req.body.userId);
    if (!userdata) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = await userdata.cartData;
    return res.json({
      success:true,
      cartData
    })
  } catch (error) {
    return res.json({
      "message":error.message,
      success:false
    })
  }
}