const express = require('express')
const { signupUser, loginUser, logoutUser, currentUser} = require('../../controllers/user')
const authMiddleware = require('../../middleware/jwt')
const { validateUser } = require('../../validators/userValidation')

const router = express.Router()

router.post('/register', validateUser, signupUser)
router.post('/login', loginUser)
router.get("/logout", authMiddleware, logoutUser)
router.get("/current", authMiddleware, currentUser)

module.exports = router