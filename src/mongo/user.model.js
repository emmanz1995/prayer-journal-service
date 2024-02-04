const mongoose = require('mongoose');
const { Schema } = mongoose;
const { getMultiple, getById, get } = require('./user/get')
const { saveUser, updateUser } = require('./user/save')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  denomination: {
    type: String,
    required: false
  },
  avatarUrl: {
    type: String,
    default: 'https://res.cloudinary.com/emmanuel-cloud-storage/image/upload/v1688214363/avatars/qsjrd3lvcduavnv1utyu.svg',
    required: false
  },
  coverPhotoUrl: {
    type: String,
    default: 'https://res.cloudinary.com/emmanuel-cloud-storage/image/upload/v1670593777/dvgncaorojmfob07w8ca.jpg',
    required: false
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  prayerRequest: [
    {
      type: Schema.Types.ObjectId,
      ref: 'journal'
    }
  ]
})

const User = mongoose.model('user', userSchema);

const FindUsers = getMultiple(User);
const FindUser = get(User);
const FindUserById = getById(User);
const AddNewUser = saveUser(User);
const UpdateUser = updateUser(User);
// const DeleteUser = removeUser(User);

module.exports = { FindUsers, FindUser, FindUserById, AddNewUser, UpdateUser }