const UpdatePhoto = Model => async payload => {
  const { photo, userId } = payload
  const updateProfilePic = await Model.findByIdAndUpdate(userId, {
    avatarUrl: photo
  }, {
    new: true
  })
  if (updateProfilePic === null) return {}

  return updateProfilePic
}

module.exports = {
  UpdatePhoto,
}
