import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlenght: 255,
        required: true
    },
    phone: {
        type: Number,
        maxlenght: 255,
    },
    email: {
        type: String,
        maxlenght: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        maxlenght: 255,
        requried: true
    },
    rol: {
        type: String,
        required: true
    },
    tipo_doc: {
        type: String,
        maxlenght: 255
    },
    nro_doc: {
        type: String,
        maxlenght: 255
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

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required().messages({
            "string.min": "El nombre es demasiado corto",
            "string.max": "El nombre es demasiado largo",
            "string.base": "Nombre inválido"
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Correo electrónico inválido"
        }),
        password: Joi.string().min(3).max(255).required().messages({
            "string.min": "Contraseña demasiado corta",
            "string.max": "Contraseña demasiado larga",
        }),
        rol: Joi.string().required().messages({
            "string.base": "Ingrese un rol válido",
            "string.req": "Ingrese un rol"
        }),
        phone: Joi.number().allow(null).messages({
            "number.base": "Ingrese un teléfono válido",
        }),
        tipo_doc: Joi.string().min(3).max(255).allow(null, "").messages({
            "string.min": "Ingrese un tipo válido",
            "string.max": "Ingrese un tipo válido"
        }),
        nro_doc: Joi.string().min(3).max(255).allow(null, "").messages({
            "string.min": "Ingrese un tipo válido",
            "string.max": "Ingrese un tipo válido"
        })

    })
        .with('tipo_doc', 'nro_doc')

    return schema.validate(user)
}

const User = mongoose.model('users', userSchema);

export default { User, validateUser };