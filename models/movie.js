const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  score: { type: Number },
});

movieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Movie', movieSchema);
