import MVenta from '../models/Venta';
import MArticle from '../models/Article'
const { Article } = MArticle;
const { Venta, validateVenta } = MVenta;

async function incStock(artId, cant) {
    let article = await Article.findById(artId);
    if (article) {
        article.stock = parseInt(article.stock) + parseInt(cant);
        await article.save();
    } else { console.error("no existe articulo") }
}

async function decStock(artId, cant) {
    let article = await Article.findById(artId);
    article.stock = parseInt(article.stock) - parseInt(cant);
    await article.save();
}



export default {
    add: async (req, res, next) => {

        const { error } = validateVenta(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {
            const venta = new Venta(req.body);
            await venta.save(venta);

            venta.detalles.map((x) => {
                decStock(x._id, x.cantidad)
            });

            res.status(200).json(venta);
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                next(new Error('Comprobande duplicado'));
            } else {
                next(e);
            }
        }
    },

    query: async (req, res, next) => {
        try {
            const venta = await Venta.findById(req.query._id)
                .populate('user', 'name')
                .populate('client', 'name')
            if (!venta) return res.status(404).send({
                message: "La venta no existe"
            });
            res.status(200).json(venta);
        } catch (e) {
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            const venta = await Venta.find()
                .populate('user', 'name state ')
                .populate('client', 'name state direccion email phones');


            res.status(200).json(venta);

        } catch (e) {
            next(e);
        }
    },
    resumen: async (req, res, next) => {
        try {
            const venta = await Venta.find({ client: req.query._id })
                .populate('user', 'name state ')
                .populate('client', 'name state direccion email phones');


            res.status(200).json(venta);

        } catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {

            const venta = await Venta.findByIdAndUpdate(req.query._id, req.body, { new: true });
            if (!venta) return res.status(404).json({ message: "venta not found" })
            res.status(200).json(venta);
        } catch (e) {
            next(e)
        }
    },
    // remove: async (req, res, next) => {
    //     try {
    //         const category = await Category.findByIdAndDelete(req.query.id);
    //         res.status(200).json(category);
    //     } catch (e) {
    //         next(e)
    //     }
    // },
    act: async (req, res, next) => {
        try {

            const venta = await Venta.findByIdAndUpdate(req.query.id, { state: 1 }, { new: true });

            venta.detalles.map((x) => {
                decStock(x._id, x.cantidad)
            });
            res.status(200).json(venta);

        } catch (e) {
            next(e);
        }
    },
    desact: async (req, res, next) => {
        try {

            const venta = await Venta.findByIdAndUpdate(req.query.id, { state: 0 }, { new: true });
            venta.detalles.map((x) => {
                incStock(x._id, x.cantidad)
            });

            res.status(200).json(venta)


        } catch (e) {
            next(e)
        }
    },
    grafico12Meses: async (req, res, next) => {
        try {
            const estaditicaVentas = await Venta.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" }
                        },
                        total: { $sum: "$total" },
                        numero: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        "_id.year": -1,
                        "_id.month": -1
                    }
                }
            ]).limit(12);
            res.status(200).json(estaditicaVentas)
        } catch (e) {
            next(e)
        }
    },
    entreFechas: async (req, res, next) => {
        try {
            let start = req.query.start;
            let end = req.query.end;
            let valor = req.query.valor;

            const ventas = await Venta.find({
                "createdAt": {
                    "$gte": start,
                    "lt": end
                }
            })
                .populate('user', 'name state')
                .populate('client', 'name state')
            res.status(200).json(ventas);

        } catch (e) {
            next(e);
        }
    },
}
