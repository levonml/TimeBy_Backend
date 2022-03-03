import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI;
mongoose.connect(url);

const userSchema = new mongoose.Schema({
  name:{type:String, required:true},
  surname: {type:String, required:true},
  userName: { type: String, required: true, unique:true },
  password: { type: String, required: true},
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
});
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
	delete returnedObject.password
  },
});
const User = mongoose.model('User', userSchema);

export default User;
