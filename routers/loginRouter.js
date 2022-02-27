import express from "express";

import Login from '../models/userModel.js';

const loginRouter = express.Router()

loginRouter.get('/', async (request, response, next) => {
	try {
	  const note = await Login.find({});
	  console.log('data from controller', note);
	  response.json(note);
	} catch (err) { next(err); }
  });
  loginRouter.post('/', async (request, response, next) => {
	try {
	  const { body } = request;
	  const note = new Login({
		login: body.login,
		password: body.password,
	  });
	  const savedNote = await note.save();
	  response.json(savedNote);
	} catch (err) { next(err); }
  });
  loginRouter.delete('/', async (request, response, next) => {
	try {
	  const ret = await Login.deleteMany();
	  response.status(204).json(ret);
	} catch (error) { next(error); }
  });
  export default loginRouter