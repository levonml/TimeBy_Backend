import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI;
mongoose.connect(url);

const timeSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
timeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // console.log('returnedobject - ', returnedObject);
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Login = mongoose.model('Note', timeSchema);

export default Login;
