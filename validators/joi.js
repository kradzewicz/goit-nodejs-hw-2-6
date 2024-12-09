const Joi = require('joi');



const schemaContact = Joi.object({
    name: Joi.string().min(2).required().messages({
        "string.empty": "Name field is required",
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).messages({
        "string.email": "This email is not valid",
    }),
    phone: Joi.string().required().messages({
        "any.messages": "Phone number is required",
    }),
    favorite: Joi.boolean(),
})

const schemaStatus = Joi.object({
    favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
  }),

})

const schemaUser = Joi.object({
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password field is required",
        "string.min": "Password must be at least 6 characters long",
  }),
    email: Joi.string().email({minDomainSegments:2}).required().messages({
        "string.empty": "Email field is required",
        "string.email": "Please enter a valid email",
    }),
    username: Joi.string().required().messages({
        "string.empty": "Username field is required"
    })
})

module.exports = {
    schemaContact,
    schemaStatus,
    schemaUser
}