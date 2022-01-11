const Joi = require('joi');

const schema = Joi.object({
    slug: Joi.string().required(),
    title: Joi.string().required(),
    excerpt: Joi.string(),
    content: Joi.string(),
    category_id: Joi.number().integer().min(1).required()
})

module.exports = schema; 