import express from 'express'
import middlewares from '../utils/middlewares.js'
import User from '../models/userModel.js'

const contentRouter = express.Router()

contentRouter.get('/:userName', async (request, response, next) => {
  const userName = request.params.userName
  try {
    const user = await User.findOne({ userName: userName })
    response.json(user)
  } catch (err) {
    next(err)
  }
})
contentRouter.put(
  '/addYear/:userName',
  middlewares.tokenExtractor,
  async (request, response, next) => {
    const body = request.body
    const userName = request.params.userName
    const year = body.year

    try {
      console.log('year is', year)
      /*      const userData = await User.find({ userName: userName }, { content: 1 });
      const dublicateYear = userData[0].content.find((el) => el.year === year);
      const userDataUpdated = !dublicateYear
        ? userData
        : userData[0].content.push({ year: year });

      console.log("userData = ", userDataUpdated);
      const res = await User.findOneAndUpdate(
        { userName: userName },
        { $set: { content: userDataUpdated } },
        { new: true }
      ); */
      const res = await User.updateOne(
        { userName: userName },
        { $push: { content: { year: body.year } } },
        { new: true }
      )
      response.status(201).json(res)
    } catch (err) {
      next(err)
    }
  }
)

contentRouter.put(
  '/addtext/:user/:year',
  middlewares.tokenExtractor,
  async (request, response, next) => {
    const year = request.params.year
    const user = request.params.user
    const body = request.body
    try {
      const userData = await User.find({ userName: user }, { content: 1 })
      const userDataUpdated = userData[0].content.map((el) => {
        if (el.year === year) {
          el.text.push(body.text)
        }
        return el
      })
      const res = await User.findOneAndUpdate(
        { userName: user },
        { $set: { content: userDataUpdated } },
        { new: true }
      )
      response.status(201).json(res.content)
    } catch (err) {
      next(err)
    }
  }
)
contentRouter.put(
  '/removetext/:user/:year/:index',
  async (request, response, next) => {
    const params = request.params
    const index = params.index
    const year = params.year
    const user = params.user
    try {
      const result = await User.find({ userName: user }, { content: 1 })
      const updatedText = result[0].content.map((el) => {
        if (el.year === year) {
          el.text.splice(index, 1)
        }
        return el
      })
      const oneNotes = await User.findOneAndUpdate(
        { userName: user },
        { $set: { content: updatedText } },
        { new: true }
      )
      response.json(oneNotes)
    } catch (err) {
      next(err)
    }
  }
)
/* contentRouter.delete('/', async (request, response, next) => {
		try {
		  const ret = await User.deleteMany();
		  response.status(204).json(ret);
		} catch (error) { next(error); }
	  });
  noteRouter.delete('/', async (request, response, next) => {
	try {
	  const ret = await Note.deleteMany();
	  response.status(204).json(ret);
	} catch (error) { next(error); }
  }); */
contentRouter.put(
  '/deleteOneYear/:user/:year',
  async (request, response, next) => {
    const user = request.params.user
    const year = request.params.year
    try {
      const res = await User.updateOne(
        { userName: user },
        { $pull: { content: { year: year } } },
        { new: true }
      )
      response.json(res)
    } catch (err) {
      next(err)
    }
  }
)
export default contentRouter
