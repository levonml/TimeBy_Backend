const errorHandler = (error, req, res, next) => {
	return res.status(400).json({ error: error.message })
	next(error)
}

const unknownEndpoint = (req, res) =>{
res.status(404).send({error:"unknown endpoint"})
}
export default unknownEndpoint