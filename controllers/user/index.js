const { fetchUser, setToken } = require("./services")
const User = require('../../models/User')
const jwt = require("jsonwebtoken")


const signupUser = async (req, res, next) => {
    const { username, email, password } = req.body
    const userData = await fetchUser({email})
    if (userData) {
        return res.status(409).json({message: 'This email is already taken.'})
    }
    try {
        const newUser = new User({ username, email })
        await newUser.setPassword(password)
        await newUser.save()
        return res.status(201).json({message: 'New user created'})
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
            subscription: user.subscription,
            token: user.token,
        }
    })
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    currentUser
}