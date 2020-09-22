const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (_, res) => {
  const users = await User.find({}).populate('movies', { title: 1, date: 1 });
  res.json(users);
});

usersRouter.post('/', async (req, res, next) => {
  const body = req.body;

  if (!body.password) return res.status(400).json('password is required');
  else if (body.password.length < 4)
    return res.status(400).json('password must have at least 4 digits');

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = usersRouter;
