const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function findUser(criteria) {
  try {
    if (criteria.email) {
      return await User.findOne({ email: criteria.email });
    }
    else if (criteria.userId) {
      return await User.findOne({ _id: criteria.userId });
    }
  } catch (error) {
    console.error('Ошибка при поиске пользователя:', error);
    throw error;
  }
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function checkPassword(password, userPassword) {
  return bcrypt.compare(password, userPassword);
}

async function createUser(userData) {
  const hashedPassword = await hashPassword(userData.password);
  const newUser = new User({
    userName: userData.userName,
    email: userData.email,
    password: hashedPassword,
  });
  await newUser.save();
}

module.exports = {
  findUser,
  createUser,
  checkPassword,
  hashPassword,
};