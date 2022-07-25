import mongoose from 'mongoose';
import Joi from 'joi';

const proveedorSchema = mongoose.Schema({
    razonSocial: {
        type: String,
        maxlenght: 255,
        unique: true,
        required: true
    },
    direccion: {
        type: {
            calle: { type: String, required: true },
            nro: { type: Number, required: true },
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
    state: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

function validateProveedor(proveedor) {
    const schema = Joi.object({
        razonSocial: Joi.string().min(3).max(255).required().messages({
            "string.base": "El nombre no es válido",
            "string.min": "El nombre no es válido",
            "string.max": "El nombre no es válido"
        }),
        direccion: Joi.object({ calle: Joi.string().max(255), nro: Joi.number() }).required().length(2).messages({
            "object.length": "Ingrese una direccion con calle y número",
        }),
        phones: Joi.array().min(1).unique().required().items(Joi.number()).messages({
            "array.min": "Ingrese al menos un teléfono",
            "array.unique": "Hay telefonos repetidos",
            "array.base": "Ingrese un numero válido"

        }),
        email: Joi.string().email().required().messages({
            "string.email": "Correo electrónico inválido"
        }),
    })
    return schema.validate(proveedor);

}
const Proveedor = mongoose.model('proveedores', proveedorSchema);

export default { Proveedor, validateProveedor };