import express from "express";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";

const app = express()

app.use(express.json())
app.get("/", (request, response, next) => {
	const note = [
		{
			"hello1": "1", 
			"hello2": "2", 
			"hello3": "3"
		}
	]
	response.json(note)
})
 app.post("/", (request, response, next) => {
	const a = request.body
	console.log("body", a)
	response.json(a)
})
app.use(unknownEndpoint)
const PORT = 3000
app.listen(PORT, () => console.log("application is running on the port ", PORT))