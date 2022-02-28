import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI;
mongoose.connect(url);

const userSchema = new mongoose.Schema({
  name:{type:String, required:true},
  surname: {type:String, required:true},
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // console.log('returnedobject - ', returnedObject);
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const User = mongoose.model('User', userSchema);

export default User;
