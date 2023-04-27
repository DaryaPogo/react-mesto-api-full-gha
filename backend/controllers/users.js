const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/BadRequestError');
const RequestError = require('../errors/RequestError');
const InvalidError = require('../errors/InvalidError');

const SUCSESS = 200;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(SUCSESS).send(users);
    })
    .catch(next);
};

const findUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
      } else {
        res.status(SUCSESS).send(user);
      }
    })
    .catch(next);
};

const getInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      res.status(SUCSESS).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((newUser) => {
          res.status(SUCSESS).send(newUser.toJSON());
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new RequestError('email занят'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Incorrect data'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(SUCSESS).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data'));
      }
      next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(SUCSESS).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) {
              const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
              res.cookie('jwt', token, { httpOnly: true })
                .send(user.toJSON());
            } else {
              next(new InvalidError('Invalid email'));
            }
          })
          .catch(next);
      } else {
        next(new InvalidError('User not found'));
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  findUser,
  getInfo,
  updateProfile,
  updateAvatar,
  login,
  createUser,
};
