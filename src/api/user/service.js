const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { AddNewUser, FindUsers, FindUserById, FindUser, UpdateUser } = require('../../mongo/user.model');
const BadRequest = require('../../errors/badRequest')

const signUp = async body => {
  const { username, email, password, confirmPassword, avatarUrl, coverPhotoUrl, denomination } = body;
  let user = await FindUser(email);
  // if(password !== confirmPassword) {
  //   throw new BadRequest('Password and confirm password do not match');
  // }
  if(user) {
    throw new BadRequest('User already exists');
  }
  try {
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    user = await AddNewUser({
      username,
      email,
      password: password,
      avatarUrl,
      coverPhotoUrl,
      denomination
    });

    user.password = hashedPassword;
    user.save();

    return user;
  } catch(err) {
    throw err;
  }
}

module.exports = { signUp }