import express from 'express';
import { addCartItems, removeCartItems, showCartItems } from '../controller/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware,addCartItems);
cartRouter.post('/remove',authMiddleware,removeCartItems);
cartRouter.post('/show',authMiddleware,showCartItems);

export default cartRouter;