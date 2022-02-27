import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.MONGODB_URI
mongoose.connect(url)

const timeSchema = new mongoose.Schema({
login: String,
password: String
})
const Note = mongoose.model('Note', timeSchema)

export default Note