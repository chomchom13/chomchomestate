import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "server route is working",
  });
};

export const updateUser = async (req ,res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account")) // checking whether the user.id ( that is token's user's id ) is equal to the params.id ( that is (/update/:id from user.route.js)'s id )

  try {
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set:{ // we need to set what the user can update otherwise in insomnia, if someone set isAdmin : true, he will gain all the access
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      }
    }, {new: true}) // this new:true is going to change and update the updatedUser to the new information and not the previous one

    const{ password , ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
