import mongoose from 'mongoose';
import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi)

const articleSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    name: {
        type: String,
        maxlength: 255,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    code: {
        type: Number,
        maxlength: 255,
        unique: true,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    desc: {
        type: String,
        maxlength: 255
    },
    state: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

function validateArticle(article) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required().messages({
            "string.base": "Ingrese un nombre válido",
            "string.min": "Ingrese un nombre válido",
            "string.max": "Ingrese un nombre válido",
        }),
        category: Joi.objectId().required(),
        price: Joi.number().min(1).required().messages({
            "number.base": "El precio debe ser un número",
            "number.min": "El precio debe se mayor a cero"
        }),
        code: Joi.number().required().messages({
            "number.base": "El código debe ser un número",
        }),
        stock: Joi.number().min(0).required().messages({
            "number.base": "El stock debe ser un número",
            "number.min": "El stock debe ser positivo"
        }),
        desc: Joi.number().min(0),
    })
    return schema.validate(article);
}

const Article = mongoose.model('articles', articleSchema);

export default { Article, validateArticle };