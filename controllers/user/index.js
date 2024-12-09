const { fetchUser } = require("./services")
const User = require('../../models/User')
const jwt = require("jsonwebtoken")


const list = (req, res, next) => {
    res.json("ok")
}
const signupUser = async (req, res, next) => {
    const { username, email, password } = req.body
    const userData = await fetchUser(email)
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
    const user = await fetchUser(email)
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
        return res.json({token})
    
    } else {
        return res.status(401).json({message:"wrong password"})
    }
    

}

module.exports = {
    signupUser,
    loginUser,
    list
}