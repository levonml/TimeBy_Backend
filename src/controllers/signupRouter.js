import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/userModel.js'

const signupRouter = express.Router()

signupRouter.post('/', async (request, response, next) => {
  console.log('olalaaaaaaaaaaaaaaaaaaa')
  try {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const newUser = new User({
      name: body.name,
      surname: body.surname,
      userName: body.userName,
      password: passwordHash,
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

export default signupRouter
