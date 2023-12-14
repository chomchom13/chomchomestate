import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); // hashSync method waits for the hashedPassword to generate so we don't need to use await here.
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error); // calls the middleware in the index.js file
  }
};

export const signin = async (req, res, next) => {
  const { email , password } = req.body;
  try {
    const validUser = await User.findOne({ email: email}); // we can also write email only as both have same names
    if(!validUser) return next(errorHandler(404, "User not found!")); // our custom made errorHandler from utils folder
    const validPassword = bcryptjs.compareSync(password, validUser.password) // compareSync method of bcryptjs automatically compares the password that the user just inputed with the hashed password in the database if there is any
    if(!validPassword) return next(errorHandler(401, "Wrong Credentials!"))
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET) // JWT_SECRET key is unique and is only known to us . This unique key only belongs to our application 
    const { password: pass, ...rest } = validUser._doc; // Here , we don't want to send the password to the user as a response so we are seperating the rest of the validUser data with the password and then we will send the rest ( which is rest of the user info except the password ( the password exists in validUser._doc ))
    res.cookie('access_token',token, {httpOnly : true}).status(200).json(rest); // httpOnly: true adds security to out cookie and ensures that the cookie belongs to our application
  } catch (error) {
    next(error); // calls the middleware in the index.js file
  }
};
