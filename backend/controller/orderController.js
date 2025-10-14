import Stripe from "stripe";
import order from "../models/orderModels.js";
import user from "../models/userModel.js";

export const placeOrder = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const frontend_url = process.env.FRONTEND_URL;

  try {
    const newOrder = await order.create({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      adress: req.body.adress,
    });

    await user.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // rupees → paise
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100, // ₹2
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOrder = async(req,res) =>{
  const {orderId, success} = req.body;
  try {
    if(success == "true"){
      await order.findByIdAndUpdate(orderId,{payment:true});
      return res.json({
        success:true,
        message:"paid",
      })
    }else{
      await order.findByIdAndDelete(orderId);
      return res.json({
        success:false,
        message:"not Paid",
      })
    }
    
  } catch (error) {
    return res.json({
        success:false,
        message:error.message,
      })
  }
}

export const userOrder = async(req,res) =>{
  try {
    const orders = await order.find({userId:req.body.userId});
    return res.json({
      success:true,
      orders
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}

//show all orders
export const listOrders = async(req, res) =>{
  try {
    let orderlist = await order.find({})
    return  res.json({
      success:true,
      orderlist
    })
  } catch (error) {
    return  res.json({
      success:false,
      message:error.message
    })
  }
}

//api for updating order status

export const updateStatus =async(req, res) =>{
  try {
    await order.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    return res.json({
      success:true,
      message:"status updated"
    })
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}


