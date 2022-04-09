import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const errorHandler = (error, req, res, next) => {
  res.status(400).send({ error: error.message })
  next()
}
const tokenExtractor = async (request, response, next) => {
  const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = request.token
      ? jwt.verify(request.token, process.env.SECRET)
      : null
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return response.status(401).json({ error: 'invalid tiken' })
    }
    request.user = user
  } catch (err) {
    next(err)
  }
  next()
}
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
export default { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }
