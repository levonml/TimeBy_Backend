import express from "express";

//import Login from '../models/loginModel.js';
import User from "../models/userModel.js";

const loginRouter = express.Router()

  loginRouter.post('/', async (request, response, next) => {
	try {
	  const body = request.body;
	  const currentUser = await User.find({login: body.login})
	 // console.log("User = ", currentUser[0]);
	  console.log("body = ", body);
	  let loggedUser = null
	  if (currentUser[0] && currentUser[0].password === body.password && currentUser[0].login === body.login){
		loggedUser = {LoggedUSerIs: currentUser[0].name}
	  } else  loggedUser = {ERROR: "wrong passeord"}
	  response.json(loggedUser);
	} catch (err) { next(err); }
  });
 
  export default loginRouter