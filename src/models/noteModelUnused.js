import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const noteSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  text: [{ type: String }],
  image: { type: String },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

noteSchema.plugin(uniqueValidator)
const Note = mongoose.model('Note', noteSchema)
export default Note
