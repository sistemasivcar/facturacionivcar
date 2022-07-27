import mongoose from 'mongoose';
import Joi, { allow } from 'joi';

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        maxlenght: 255,
        unique: true,
        required: true
    },
    direccion: {
        type: {
            calle: { type: String },
            nro: { type: Number },
        },
    },
    phones: {
        type: [Number],
        maxlenght: 255
    },
    email: {
        type: String,
        maxlenght: 255,
    },
    cuit: {
        type: String,
        maxlenght: 255
    },
    state: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: new Date().toLocaleDateString()
    },
    fechaRegistro: {
        type: String,
        maxlenght: 255
    }
});

function validateClient(client) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required().messages({
            "string.base": "El nombre no es válido",
            "string.min": "El nombre no es válido",
            "string.max": "El nombre no es válido"
        }),
        direccion: Joi.object({ calle: Joi.string().allow('').max(255), nro: Joi.number().allow('') }).allow('', null).messages({
            "object.length": "Ingrese una direccion con calle y número",
        }),
        phones: Joi.array(),
        email: Joi.string().email().allow('').messages({
            "string.email": "Correo electrónico inválido"
        }),
        cuit: Joi.string().max(255).allow(''),
        fechaRegistro: Joi.string().max(255),
    })
    return schema.validate(client);

}

const Client = mongoose.model('clients', clientSchema);

export default { Client, validateClient };