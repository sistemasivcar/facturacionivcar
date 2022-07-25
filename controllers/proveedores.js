import MProveedor from "../models/Proveedor";
const { Proveedor, validateProveedor } = MProveedor;
export default {

    add: async (req, res, next) => {
        const { error } = validateProveedor(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        try {

            const proveedor = new Proveedor(req.body);
            await proveedor.save();
            res.status(200).json(proveedor);

        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                next(new Error('Ese proveedor ya está registrado'));
            } else {
                next(e);
            }
        }
    },
    list: async (req, res, next) => {
        try {

            const proveedores = await Proveedor.find().sort('name');
            res.status(200).json(proveedores)

        } catch (e) {
            next(e)
        }
    },
    query: async (req, res, next) => {
        try {
            const proveedor = await Proveedor.findById(req.query.id);
            if (!proveedor) return res.status(404).send({ message: "proveedor dosen't exists" })
            res.status(200).json(proveedor)

        } catch (e) {
            next(e)
        }
    },
    update: async (req, res, next) => {
        const { error } = validateProveedor(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {

            const proveedor = await Proveedor.findByIdAndUpdate(req.query.id, req.body, { new: true });
            if (!proveedor) return res.status(404).json({ message: "proveedor dosen't exists" })
            res.status(200).json(proveedor);

        } catch (e) {
            next(e)
        }
    },
    remove: async (req, res, next) => {
        try {
            const proveedor = await Proveedor.findByIdAndDelete(req.query.id);
            if (!proveedor) return res.status(404).json({ message: "proveedor dosen't exists" })
            res.status(200).json(proveedor);

        } catch (e) {
            next(e)
        }
    },
    act: async (req, res, next) => {
        try {

            const proveedor = await Proveedor.findByIdAndUpdate(req.query.id, { state: 1 }, { new: true });
            if (!proveedor) return res.status(494).json({ message: "proveedor dosen't exists" })
            res.status(200).json(proveedor);

        } catch (e) {
            next(e)
        }
    },
    desact: async (req, res, next) => {
        try {
            const proveedor = await Proveedor.findByIdAndUpdate(req.query.id, { state: 0 }, { new: true });
            if (!proveedor) return res.status(404).json({ message: "proveedor dosen't exists" })
            res.status(200).json(proveedor);

        } catch (e) {
            next(e)
        }
    },
}