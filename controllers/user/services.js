const User = require('../../models/User')


const fetchUser = (email) => {
    return User.findOne({email})
}

module.exports = {fetchUser}