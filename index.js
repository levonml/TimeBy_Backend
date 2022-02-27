import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import unknownEndpoint from "./utils/middlewares.js";
import Note from "./models/userModel.js";
 
dotenv.config()

const app = express()

app.use(express.json())

app.get("/", async (request, response, next) => {
	const note = await Note.find({})
	response.json(note)
})
 app.post("/", async (request, response, next) => {
	const a = request.body
	console.log("body", a)
    const note = new Note({
	login: a.login,
	password: a.password
})
const savedNote = await note.save()
mongoose.connection.close()
	response.json(savedNote)
})
app.use(unknownEndpoint)
const PORT = process.env.PORT
app.listen(PORT, () => console.log("application is running on the port ", PORT))