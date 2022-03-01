import express from "express";
import bcrypt from 'bcrypt'
import User from "../models/userModel.js";

const loginRouter = express.Router()

  loginRouter.post('/', async (request, response, next) => {
	try {
	  const body = request.body;
	  const currentUser = await User.findOne({login: body.login})
	  console.log("currentUser = ", currentUser);
	  console.log("body = ", body);
	  const passwordCorrect = currentUser === null ? false : await bcrypt.compare(body.password, currentUser.password )
	  if (!(currentUser && passwordCorrect)){
		response.status(401).json({ERROR: "wrong password or userName"});
	  } else  {response.status(200).json({loggedIn: currentUser.name});}
	 
	} catch (err) { next(err); }
  });
 
  export default loginRouter