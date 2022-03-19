import express from "express";
import middlewares from "../utils/middlewares.js";
import User from '../models/userModel.js';

const contentRouter = express.Router()

contentRouter.get('/:userName',  async (request, response, next) => {
	const userName = request.params.userName
	try {
	  const user = await User.findOne({userName:userName})//.populate('user', { userName: 1, name: 1, surname: 1});
	// console.log("user---", user) 
	  response.json(user);
	} catch (err) { next(err); }
  });
  contentRouter.put('/addYear/:userName', middlewares.tokenExtractor, async (request, response, next) => {
	const userName = request.params.userName
	const body = request.body
	console.log(" body",  body)
	try {
		const res = await User.findOneAndUpdate({'userName': userName},{$push:{'content': {year: body.year}}}, {new:true})
		console.log("res", res)
		response.status(201).json(res)
	} catch (err) { next(err); console.log('hi from put "/:id" error')}
  });
  /*.post('/', async (request, response, next) => {
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
});*/
	contentRouter.put('/addtext/:user/:year',  middlewares.tokenExtractor, async (request, response, next) => {
		const year = request.params.year
		const user = request.params.user
		const body = request.body
		//const token = getTokenFrom(request)
		//const decodedToken = jwt.verify(token, process.env.SECRET)
		//if (!decodedToken.id) {
		//  return response.status(401).json({ error: 'token missing or invalid' })
		//}
		try {
		const result = await User.find({'userName': user}, {content:1})//{$push:{'content.2.text': body.text}})
		//const result = await User.find({content: {$elemMatch:{'year':year}}})

		console.log("result frompppppppp", result)
		//const result1 = await User.find({'userName': user})
		const res1 = result[0].content.map(el => { 
			if(el.year ===year){
				el.text.push(body.text)}
			return el
			})
		const res = await User.findOneAndUpdate({'userName': user},{$set:{'content': res1}},{new:true})
		console.log("result111111", res1) 
		console.log("resultUpdateeeed", res.content) 

		//try {
		//	const res = await User.find({'userName': user}, {new:true})
		//	console.log("result from backend", res)
			response.status(201).json(res.content)
		} catch (err) { next(err); console.log('hi from put "/:id" error')}
	  });
	  /*noteRouter.put('/removetext/:yearId/:key', async (request, response, next) => {
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
  
  noteRouter.delete('/deleteOneYear/:id', async (request, response, next) => {
	const id = request.params.id
  try {
	const oneNotes = await Note.findByIdAndRemove(id)

	response.json(oneNotes);
  } catch (err) { next(err); }
})*/
  export default contentRouter