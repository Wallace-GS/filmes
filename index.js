require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  url: String,
  likes: Number,
});

const Movie = mongoose.model('Movie', movieSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get('/api/movies', (request, response) => {
  Movie.find({}).then((movies) => {
    response.json(movies);
  });
});

app.post('/api/movies', (request, response) => {
  const movie = new Movie(request.body);

  movie.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
