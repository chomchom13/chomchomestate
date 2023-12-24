import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req ,res , next) => { // we need to verify the token that was stored as cookies when the user signed in . // we need to verify whether the user trying to update the data in the profile section is the user who is currently signed in or not
    const token = req.cookies.access_token; // remember that when we made the cookies, we named our token "access_token" in user.auth.controller

    if(!token) return next(errorHandler(401, "Unauthorized"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403, "Forbidden"));

        req.user = user; // assign the req.user to the user( that the token had in it )
        next(); // on to the next function which is updateUser
    })
}