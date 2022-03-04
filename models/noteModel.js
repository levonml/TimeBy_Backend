import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  text:{type:String},
  image: {type: String},
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
});
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Note = mongoose.model('Note', noteSchema);

export default Note;
