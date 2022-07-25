import MArticle from "../models/Article";
const { Article, validateArticle } = MArticle;

export default {
    add: async (req, res, next) => {

        const { error } = validateArticle(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {
            const article = new Article(req.body);
            await article.save(article);
            res.status(200).json(article);
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                next(new Error('Ese nombre ya está registrado'));
            } else {
                next(e);
            }
        }
    },

    query: async (req, res, next) => {
        try {
            const article = await Article.findOne({ _id: req.query.id })
                .populate('category', { name: 1 });

            if (!article) return res.status(404).send({
                message: "El articulo no existe"
            });
            res.status(200).json(article);
        } catch (e) {
            next(e);
        }
    },
    queryCod: async (req, res, next) => {
        try {
            const article = await Article.findOne({ _id: req.query.code })
                .populate('category', { name: 1 });

            if (!article) return res.status(404).send({
                message: "El articulo no existe"
            });
            res.status(200).json(article);
        } catch (e) {
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const articles = await Article.find()
                .select('name price stock state code')
                .populate('category', 'name _id')
            res.status(200).json(articles);

        } catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        const { error } = validateArticle(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {
            const article = await Article.findByIdAndUpdate(req.query.id, req.body, { new: true });
            res.status(200).json(article);
        } catch (e) {
            next(e)
        }
    },
    remove: async (req, res, next) => {
        try {
            const article = await Article.findByIdAndDelete(req.query.id);
            res.status(200).json(article);
        } catch (e) {
            next(e)
        }
    },
    act: async (req, res, next) => {
        try {

            const article = await Article.findByIdAndUpdate(req.query.id, { state: 1 }, { new: true });
            if (!article) return res.status(404).json({ message: "Articulo inexistente" })
            res.status(200).json(article)

        } catch (e) {
            next(e);
        }
    },
    desact: async (req, res, next) => {
        try {

            const article = await Article.findByIdAndUpdate(req.query.id, { state: 0 }, { new: true });
            if (!article) return res.status(404).json({ message: "Articulo inexistente" })
            res.status(200).json(article)


        } catch (e) {
            next(e)
        }
    }

}
