import express from "express";
//import bcrypt from 'bcrypt'
import User from '../models/userModel.js';

const userRouter = express.Router()

userRouter.get('/', async (request, response, next) => {
	try {
	  const allUsers = await User.find({}).populate('notes', {year:1, text:1, image:1});
	  console.log('data from controller', allUsers);
	  response.json(allUsers);
	} catch (err) { next(err); }
  });
userRouter.get('/:id', async (request, response, next) => {
	const id = request.params
  try {
	const oneNotes = await User.findOne({userName:id.id}).populate('notes', {year:1, text:1, image:1});
	response.json(oneNotes);
  } catch (err) { next(err); }
});
userRouter.delete('/', async (request, response, next) => {
	try {
	  const ret = await User.deleteMany();
	  response.status(204).json(ret);
	} catch (error) { next(error); }
  });
  userRouter.delete('/:id', async (request, response, next) => {
	try {
	  const ret = await User.deleteOne({_id:request.params.id});
	  response.status(204).json(ret);
	} catch (error) { next(error); }
  });
export default userRouter