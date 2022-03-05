import express from "express";
import bcrypt from 'bcrypt'
import User from '../models/userModel.js';

const userRouter = express.Router()

userRouter.get('/', async (request, response, next) => {
	try {
	  const allUsers = await User.find({}).populate('notes', {text:1, image:1});
	  console.log('data from controller', allUsers);
	  response.json(allUsers);
	} catch (err) { next(err); }
  });
  userRouter.get('/:id', async (request, response, next) => {
	const id = request.params
	console.log("params ====", id.id);
  try {
	const oneNotes = await User.findOne({userName:id.id}).populate('notes', {text:1, image:1});
	response.json(oneNotes);
	console.log("resonseis", oneNotes
	)
  } catch (err) { next(err); }
});
  userRouter.post('/', async (request, response, next) => {
	try {
	  const body  = request.body;
	  const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)
	  const newUser = new User({
		name : body.name,
		surname : body.surname,
		userName: body.userName,
		password: passwordHash,
	  });
	  const savedUser = await newUser.save();
	  response.status(201).json(savedUser);
	} catch (err) { next(err); }
  });
  userRouter.delete('/', async (request, response, next) => {
	try {
	  const ret = await User.deleteMany();
	  response.status(204).json(ret);
	} catch (error) { next(error); }
  });
  export default userRouter