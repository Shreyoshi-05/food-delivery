import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next) =>{
  const {token} = req.headers;
  console.log(req.body)

  if(!token){
    return res.json({
      success:false,
      message:"user not exists"
    })
  }

  try {
    const verify_token = jwt.verify(token,process.env.JWT_SECRET);
    if (!req.body) req.body = {};
    req.body.userId = verify_token.id;
    next();

  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}