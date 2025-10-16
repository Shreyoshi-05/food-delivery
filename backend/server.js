import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';

import 'dotenv/config'
import cartRouter from './routes/cartRoutss.js';
import orderRouter from './routes/orderRouter.js';
// import cartRouter from './routes/cartRoutss.js';

//app config
const app = express()
const port = 4000;

//middlewere
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
     "http://localhost:5174",
    "https://food-delivery-frontend-seven-tau.vercel.app", 
    "https://food-delivery-rogz.vercel.app"
  ],
  credentials: true,
}));

connectDb();
//api endpoints
app.use("/api/food",foodRouter);
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.use('/images',express.static("uploads"))
app.get("/",(req,res)=> res.send("api working"));


app.listen(port,()=> console.log(`server is running on ${port}`))