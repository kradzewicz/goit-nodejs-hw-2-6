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

module.exports = {
    schemaContact,
    schemaStatus
}