import mongoose from 'mongoose';
import Joi from 'joi';

const ventaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients'
    },
    tipoComprobante: {
        type: String,
        required: true,
        maxlength: 255
    },
    serieComprobante: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 255
    },
    pagos: [{
        createdAt: {
            type: String,
            default: '',
        },
        state: {
            type: Number,
            default: 1
        },
        forma: {
            type: String
        },
        monto: { type: Number },
        nroPago: { type: Number }
    }],
    saldo: {
        type: Number
    },
    pagado: {
        type: Number
    },
    impuesto: {
        type: Number,
        required: true,
        default: 0
    },


    total: {
        type: Number,
        required: true,
    },
    detalles: [{
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        articleName: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precioCompra: { type: Number, required: true },

    }],
    state: {
        type: Number,
        default: 1
    },
    fechaFacturacion: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

function validateVenta(venta) {
    const schema = Joi.object({
        user: Joi.objectId().required(),
        client: Joi.objectId().required(),
        tipoComprobante: Joi.string().min(3).max(255).required().messages({
            "string.base": "Ingrese un tipo de comprobante",
            "string.min": "Ingrese un tipo de comprobante válido",
            "string.max": "Ingrese un tipo de comprobante válido"
        }),
        serieComprobante: Joi.number().min(0).required(),
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
        })),
        pagos: Joi.array().items(Joi.object().length(2).messages({
            "object.length": "Ingrese un monto y forma de pago"
        })).messages({
            "array.items": "Ingrese un monto y forma de pago"
        }),
        saldo: Joi.number().min(0).messages({
            "number.min": "Ingrese un monto entregado válido",
            "number.number": "Ingrese un monto entregado válido"
        }),
        impuesto: Joi.number().min(0).messages({
            "number.min": "Ingrese un iva válido",
            "number.number": "Ingrese un iva válido"
        }),
        entregado: Joi.number().min(0).messages({
            "number.min": "Ingrese un monto entregado válido",
            "number.number": "Ingrese un monto entregado válido"
        }),
        fechaFacturacion: Joi.string()

    });
    return schema.validate(venta);
}

const Venta = mongoose.model('ventas', ventaSchema);
export default { Venta, validateVenta };