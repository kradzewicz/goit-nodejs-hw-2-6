const express = require('express')
const { signupUser, loginUser, logoutUser, currentUser, updateUserAvatar} = require('../../controllers/user')
const authMiddleware = require('../../middleware/jwt')
const { validateUser } = require('../../validators/userValidation')
const { uploadMiddleware, validateAndTransformImage } = require('../../middleware/imageUpload')

const router = express.Router()

router.post('/register', validateUser, signupUser)
router.post('/login', loginUser)
router.get("/logout", authMiddleware, logoutUser)
router.get("/current", authMiddleware, currentUser)
router.patch("/avatars", authMiddleware,uploadMiddleware.single('avatar'), validateAndTransformImage, updateUserAvatar)

module.exports = router