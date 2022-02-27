import express from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import middleware from './utils/middlewares.js';
import Login from './models/userModel.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', async (request, response, next) => {
  try {
    const note = await Login.find({});
    console.log('data from controller', note);
    response.json(note);
  } catch (err) { next(err); }
});
app.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const note = new Login({
      login: body.login,
      password: body.password,
    });
    const savedNote = await note.save();
    response.json(savedNote);
  } catch (err) { next(err); }
  // mongoose.connection.close();
});
app.delete('/', async (request, response, next) => {
  try {
    const ret = await Login.deleteMany();
    response.status(204).json(ret);
  } catch (error) { next(error); }
});
app.use(middleware.errorHandler);

app.use(middleware.unknownEndpoint);
const { PORT } = process.env;
app.listen(PORT, () => console.log('application is running on the port ', PORT));
