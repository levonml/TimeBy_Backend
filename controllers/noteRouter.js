import express from "express";
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import Note from "../models/noteModel.js";

const noteRouter = express.Router()

noteRouter.get('/', async (request, response, next) => {
	try {
	  const allNotes = await Note.find({}).populate('user', { userName: 1, name: 1, surname: 1});
	  response.json(allNotes);
	} catch (err) { next(err); }
  });
  const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
	  return authorization.substring(7)
	}
	return null
  }
  noteRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body
		const token = getTokenFrom(request)
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!decodedToken.id) {
		  return response.status(401).json({ error: 'token missing or invalid' })
		}
		const currentUser = await User.findById(decodedToken.id)
	  const newNote = new Note({
		text : body.text,
		image : body.image,
		user: currentUser._id
	  });

	 const savedNote = await newNote.save();
	  const updatedUser = currentUser.notes.concat(savedNote._id)
	  await currentUser.update({notes:updatedUser})
	  response.status(201).json(savedNote);
	} catch (err) { next(err); }
  });
  noteRouter.delete('/', async (request, response, next) => {
	try {
	  const ret = await Note.deleteMany();
	  response.status(204).json(ret);
	} catch (error) { next(error); }
  });
  export default noteRouter