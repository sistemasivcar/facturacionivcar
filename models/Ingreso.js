import mongoose from 'mongoose';
import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi)

const ingresoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proveedores'
    },
    tipoComprobante: {
        type: String,
        required: true,
        maxlength: 255
    },
    serieComprobante: {
        type: Number,
        required: true,
        maxlength: 255
    },
    impuesto: {
        type: Number,

    },
    total: {
        type: Number,
        required: true,
    },
    detalles: [{
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        articleName: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precioCompra: { type: Number, required: true }

    }],
    state: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

function validateIngreso(ingreso) {
    const schema = Joi.object({
        user: Joi.objectId().required(),
        proveedor: Joi.objectId().required(),
        tipoComprobante: Joi.string().min(3).max(255).required().messages({
            "string.base": "Ingrese un tipo de comprobante",
            "string.min": "Ingrese un tipo de comprobante válido",
            "string.max": "Ingrese un tipo de comprobante válido"
        }),
        serieComprobante: Joi.number().min(0).required(),
        impuesto: Joi.number().allow(""),
        total: Joi.number().min(0).messages({
            "number.base": "Ingrese un total válido",
            "string.min": "Ingrese un total válido",
        }),

        detalles: Joi.array().min(1).required().messages({
            "array.base": "Ingrese al menos un producto",
            "array.min": "Ingrese al menos un producto",
        }).items(Joi.object().length(4).messages({
            "object.base": "Ingrese al menos un producto",
            "object.length": "Ingrese al menos un producto",
        }))

    });
    return schema.validate(ingreso);
}
const Ingreso = mongoose.model('ingresos', ingresoSchema);
export default { Ingreso, validateIngreso };