import Joi from 'joi';
import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 255,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        maxlength: 255
    },
    state: {
        type: Number,
        default: 1
    },
    createdAt: { type: Date, default: Date.now }
});

function validate(category) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required().messages({
            "any.required": "El nombre es requerido",
            "string.min": "El nombre es muy corto",
            "string.max": "El nombre es muy largo",
        }),
        desc: Joi.string().min(3).max(255).allow('').messages({
            "string.min": "La descripción es muy corta",
            "string.max": "La descripción es muy larga",
        }),
    });

    return schema.validate(category);
}
const Category = mongoose.model('categories', categorySchema);

export default {
    Category,
    validateCategory: validate
};