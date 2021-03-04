const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(2).required(),
    });

    return schema.validate(data).error;
}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });

    return schema.validate(data).error;
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;