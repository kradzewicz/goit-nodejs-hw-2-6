const { schemaUser } = require("./joi")

const validateUser = (req, res, next) => { 
    const { error } = schemaUser.validate(req.body)
    
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            errors: error.details.map((detail => detail.message))
        })
    }
    next()
}

module.exports = {validateUser}