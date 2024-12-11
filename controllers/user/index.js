const { fetchUser, setToken } = require("./services")
const User = require('../../models/User')
const jwt = require("jsonwebtoken")
const gravatar = require('gravatar')
const path = require('path')
const { nanoid } = require("nanoid")
const verificationMail = require("../../modules/email")


const signupUser = async (req, res, next) => {
    const { username, email, password } = req.body
    const userData = await fetchUser({email})
    if (userData) {
        return res.status(409).json({message: 'This email is already taken.'})
    }
    try {
        const newUser = new User({ username, email })
        newUser.avatarURL = gravatar.url(email, { s: 250 })
        newUser.verificationToken = nanoid()
        await newUser.setPassword(password)
        await newUser.save()
        const html = `<a href="http://localhost:3000/api/user/verify/${newUser.verificationToken}"><h2>Click here to confirm your registration</h2></a>`
        await verificationMail(html, email)
        return res.status(201).json({
            message: 'New user created'
        })
    } catch (error){
        next(error)
    }
}

const loginUser = async (req, res, next) => { 
    const { email, password } = req.body
    const user = await fetchUser({email})
    if (!user) {
        return res.status(401).json({mesaage: 'no matching user'})
    }
    const isPasswordCorrect = await user.validatePassword(password)
    if (isPasswordCorrect) {
        const payload = {
            id: user._id,
            username: user.username,
        }
        const token = jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: '12h'}
        )

        const userWithToken = await setToken(user._id, {token})
        return res.json({
            message: 'Login succseful',
            token: userWithToken.token,
            user:{
                email: userWithToken.email,
                avatar: userWithToken.avatarURL,
                subscribtion: userWithToken.subscription
        }})
    } else {
        return res.status(401).json({message:"wrong password"})
    }
}

const logoutUser = async (req, res, next) => {
    const { _id } = req.user
    const user = await fetchUser({ _id })
    
    if (!user) {
        return res.status(401).json({ message: "Not authorizeddd"})
    }
    
    await setToken(user._id, { token: null })
    
    return res.status(204).json()
}

const currentUser = async (req, res) => {
    const { email} = req.user
    const user = await fetchUser({ email });

    if (!user) {
        return res.status(401).json({ message: "Not authorized"})
    }

    return res.status(200).json({
        current_user: {
            email: user.email,
            avatar: user.avatarURL,
            subscription: user.subscription,
            token: user.token,
        }
    })
}

const updateUserAvatar = async (req, res) => {
    const { _id } = req.user
    const avatar = req.file.filename
    try {
        if (!avatar) {
            return res.status(400).json({message:"Avatar is missing"})
        }
        const avatarURL = path.join('/images', avatar)
        
        const user = await fetchUser({ _id })
        
        if (!user) {
            return res.status(401).json({ message: "Not authorizeddd"})
        }
        
        await setToken(user._id, { avatarURL: avatarURL })
        
        return res.status(200).json({avatarURL: avatarURL})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const verifyUser = async (req, res, next) => {
    const { verificationToken } = req.params 
    console.log(req.params)
    try {
        const user = await fetchUser({ verificationToken })
        
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        user.verify = true
        user.verificationToken = null
        await user.save()
        res.status(200).json({message: 'Verification successful'})
    } catch (error) {
        next(error)
    }
}

const verifyUserbyEmail = async (req, res, next) => {
    const email = req.body.email
    
    if (!email) {
        return res.status(400).json({message: "missing require field email"})
    }
    try {
        const user = await fetchUser({ email })

        if (user.verificationToken === null) {
            return res.status(400).json({message: "Verification has already been passed"})
        }
        const html = `<a href="http://localhost:3000/api/user/verify/${user.verificationToken}"><h2>Click here to confirm your registration</h2></a><h4>and try not to loose this email again</h4>`
        await verificationMail(html, email)
        res.status(200).json({message: "Verification email sent"})

    } catch (error) {
        next(error)
    }
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    currentUser,
    updateUserAvatar,
    verifyUser,
    verifyUserbyEmail
}