const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  likes: Number,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

movieSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Movie', movieSchema);
