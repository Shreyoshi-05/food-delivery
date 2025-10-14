import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

export const loginUser = async (req, res) => {
  const{password,email} = req.body;

  const findUser = await user.findOne({email});
  if(!findUser){
    return res.json({
        success: false,
        message: "user not exists",
      });
  }

  const isMatched = await bcrypt.compare(password,findUser.password);
  if(!isMatched){
    return res.json({
        success: false,
        message: "user Does not exists",
      });
  }

  const token = createToken(findUser._id);
  return res.json({
        success: true,
        message: "Successfully logined",
        token,
      });
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await user.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);
    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "this is error in user",
    });
  }
};
