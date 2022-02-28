import express from "express";

import User from '../models/userModel.js';

const userRouter = express.Router()

userRouter.get('/', async (request, response, next) => {
	try {
	  const allUsers = await User.find({});
	  console.log('data from controller', allUsers);
	  response.json(allUsers);
	} catch (err) { next(err); }
  });
  userRouter.post('/', async (request, response, next) => {
	try {
	  const body  = request.body;
	  const newUser = new User({
		name : body.name,
		surname : body.surname,
		login: body.login,
		password: body.password,
	  });
	  const savedUser = await newUser.save();
	  response.json(savedUser);
	} catch (err) { next(err); }
  });
  userRouter.delete('/', async (request, response, next) => {
	try {
	  const ret = await User.deleteMany();
	  response.status(204).json(ret);
	} catch (error) { next(error); }
  });
  export default userRouter