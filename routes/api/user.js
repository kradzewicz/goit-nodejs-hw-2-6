const express = require('express')
const { signupUser, loginUser, list } = require('../../controllers/user')

const router = express.Router()

router.get("/", list)
router.post('/register', signupUser)
router.post('/login', loginUser)

module.exports = router