import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  privacy: { type: String },
  content: [
    {
      year: {
        type: String,
        require: true,
      },
      text: [{ type: String }],
    },
  ],
})
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema)

export default User
