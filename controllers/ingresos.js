import MIngreso from '../models/Ingreso';
import MArticle from '../models/Article'
const { Article } = MArticle;
const { Ingreso, validateIngreso } = MIngreso;

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
        const { error } = validateIngreso(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {
            const ingreso = new Ingreso(req.body);
            await ingreso.save(ingreso);

            ingreso.detalles.map((x) => {
                incStock(x._id, x.cantidad)
            });

            res.status(200).json(ingreso);
        } catch (e) {
            next(e);
        }
    },

    query: async (req, res, next) => {
        try {
            const ingreso = await Ingreso.findById(req.query._id)
                .populate('user', 'name')
                .populate('proveedor', 'razonSocial')
            if (!ingreso) return res.status(404).send({
                message: "El ingreso no existe"
            });
            res.status(200).json(ingreso);
        } catch (e) {
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const ingreso = await Ingreso.find()
                .populate('user', 'name state')
                .populate('proveedor', 'razonSocial state')
            res.status(200).json(ingreso);

        } catch (e) {
            next(e);
        }
    },
    // update: async (req, res, next) => {
    //     try {
    //         const category = await Category.findByIdAndUpdate(req.query.id, {
    //             name: req.body.name,
    //             desc: req.body.desc
    //         }, { new: true });
    //         if (!category) return res.status(404).json({ message: "category not found" })
    //         res.status(200).json(category);
    //     } catch (e) {
    //         next(e)
    //     }
    // },
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

            const ingreso = await Ingreso.findByIdAndUpdate(req.query.id, { state: 1 }, { new: true });
            ingreso.detalles.map((x) => {
                incStock(x._id, x.cantidad)
            });
            res.status(200).json(ingreso);

        } catch (e) {
            next(e);
        }
    },
    desact: async (req, res, next) => {
        try {

            const ingreso = await Ingreso.findByIdAndUpdate(req.query.id, { state: 0 }, { new: true });
            ingreso.detalles.map((x) => {
                decStock(x._id, x.cantidad)
            });

            res.status(200).json(ingreso)


        } catch (e) {
            next(e)
        }
    },
    grafico12Meses: async (req, res, next) => {
        try {
            const estaditicaIngresos = await Ingreso.aggregate([
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
            res.status(200).json(estaditicaIngresos);
        } catch (e) {
            next(e)
        }
    },
    entreFechas: async (req, res, next) => {
        try {
            let start = req.query.start;
            let end = req.query.end;
            let valor = req.query.valor;

            const ingreso = await Ingreso.find({
                "createdAt": {
                    "$gte": start,
                    "lt": end
                }
            })
                .populate('user', 'name state')
                .populate('proveedor', 'razonSocial state')
            res.status(200).json(ingreso);

        } catch (e) {
            next(e);
        }
    },

}
