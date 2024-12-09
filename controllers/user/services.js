const User = require('../../models/User')


const fetchUser = (key) => {
    return User.findOne(key)
}

const setToken = (_id, token) => {
    return User.findByIdAndUpdate(
      { _id: _id },
      { $set: token },
      {
        new: true,
        runValidators: true,
        strict: 'throw',
        upsert: false
      }
    )
  }

module.exports = {fetchUser, setToken}