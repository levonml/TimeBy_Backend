import express from "express";
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import Note from "../models/noteModel.js";
import { text } from "express";

const noteRouter = express.Router()

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
	  return authorization.substring(7)
	}
	return null
  }
noteRouter.get('/', async (request, response, next) => {
	try {
	  const allNotes = await Note.find({}).populate('user', { userName: 1, name: 1, surname: 1});
	  response.json(allNotes);
	} catch (err) { next(err); }
  });
   /* noteRouter.get('/:id', async (request, response, next) => {
	  const id = request.params
	  console.log("params ====", id.id);
	try {
		console.log("resonseis before")
	  const oneNotes = await Note.findById(id.id).populate('user', { userName: 1, name: 1, surname: 1});
	  console.log("resonseis", oneNotes)

	  response.json(oneNotes);
	} catch (err) { next(err); }
  });  */
 
  noteRouter.post('/', async (request, response, next) => {
	try {
		console.log('hi from post "/"')
		const body = request.body
		const token = getTokenFrom(request)
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!decodedToken.id) {
		  return response.status(401).json({ error: 'token missing or invalid' })
		}
		const currentUser = await User.findById(decodedToken.id)
	    const newNote = new Note({
		  year: body.year,
		  text : body.text,
		  image : body.image,
		  user: currentUser._id
	  });

	 const savedNote = await newNote.save();
	  const updatedUser = currentUser.notes.concat(savedNote._id)
	  await currentUser.updateOne({notes:updatedUser})
	  response.status(201).json(savedNote);
	} catch (err) { next(err); }
});
	noteRouter.put('/addtext/:yearId/:user/:year', async (request, response, next) => {
		try {
			const year = request.params.year
			const user = request.params.user
			const yearId = request.params.yearId

			const body = request.body

			const token = getTokenFrom(request)
			const decodedToken = jwt.verify(token, process.env.SECRET)
			if (!decodedToken.id) {
			  return response.status(401).json({ error: 'token missing or invalid' })
			}

			const res = await Note.findOneAndUpdate({'_id': yearId},{$push:{'text': body.text}}, {new:true})
			console.log("result from backend", res)
			response.status(201).json(res)
		} catch (err) { next(err); console.log('hi from put "/:id" error')}
	  });
	  noteRouter.put('/removetext/:yearId/:key', async (request, response, next) => {
		const params = request.params
		const key= params.key
		const yearId =params.yearId
		try {
		const obj = await Note.findById(yearId)
		const textModified = obj.text
		textModified.splice(key, 1)
		const oneNotes = await Note.findOneAndUpdate({_id:yearId}, {$set: {'text': textModified}}, {new: true})
		console.log("deleted response =", oneNotes)
		response.json(oneNotes);
	  } catch (err) { next(err); }
	})
	  noteRouter.delete('/', async (request, response, next) => {
		try {
		  const ret = await Note.deleteMany();
		  response.status(204).json(ret);
		} catch (error) { next(error); }
	  });
  noteRouter.delete('/', async (request, response, next) => {
	try {
	  const ret = await Note.deleteMany();
	  response.status(204).json(ret);
	} catch (error) { next(error); }
  });
  
  noteRouter.delete('/:id', async (request, response, next) => {
	const id = request.params
  try {
	const oneNotes = await Note.findByIdAndRemove(id.id)

	response.json(oneNotes);
  } catch (err) { next(err); }
})
  export default noteRouter