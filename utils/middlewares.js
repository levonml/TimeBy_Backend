import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const errorHandler = (error, req, res, next) => {
  res.status(400).send({ error: error.message });
  next();
};
const tokenExtractor = async (request, response, next) => {
	const getTokenFrom = () => {
		const authorization = request.get('authorization')
		if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		  return authorization.substring(7)
		}
		return null
	  }
	const token = getTokenFrom()
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	next()
}

 const userExtractor = async (request, response, next) => {
	try {
		//console.log("Extracted Tokeeen", request.token);
		const decodedToken = request.token
			? jwt.verify(request.token, process.env.SECRET)
			: null;
		//console.log("decodedToken - ", decodedToken);
		if (!decodedToken || !decodedToken.id) {
			return response.status(401).json({ error: "token missing or invalid" });
		}
		//console.log("decodedToken.id ======", decodedToken.id);
		//console.log(":users in the databasw =", await User.find({}));
		const user = await User.findById(decodedToken.id);
		//console.log("useeeeeeeeeeeeeer  after", user);
		if (!user) {
			return response.status(401).json({ error: "invalid tiken" });
		}
		request.user = user;
	} catch (err) {
		next(err);
	}
	next();
};
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
export default { unknownEndpoint, errorHandler, tokenExtractor, userExtractor };
