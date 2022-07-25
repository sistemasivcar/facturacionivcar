//import MCategory from "../models/Category";

import MCategory from '../models/Category';
const { Category, validateCategory } = MCategory;

export default {
    add: async (req, res, next) => {

        const { error } = validateCategory(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {
            const category = new Category({
                name: req.body.name,
                desc: req.body.desc
            });
            await category.save(category);
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    },

    query: async (req, res, next) => {
        try {
            const category = await Category.findById(req.query.id);
            if (!category) return res.status(404).send({
                message: "La categoria no existe"
            });
            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const categories = await Category.find().select('name desc state').sort('name');
            res.status(200).json(categories);

        } catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {

        const { error } = validateCategory(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        console.log(req.query)
        try {
            const category = await Category.findByIdAndUpdate(req.query._id, {
                name: req.body.name,
                desc: req.body.desc
            }, { new: true, useFindAndModify: false });
            if (!category) return res.status(404).json({ message: "category not found" })
            res.status(200).json(category);
        } catch (e) {
            next(e)
        }
    },
    remove: async (req, res, next) => {
        try {
            const category = await Category.findByIdAndDelete(req.query._id);
            if (!category) return res.status(404).json({ message: 'category not found' });
            res.status(200).json(category);
        } catch (e) {
            next(e)
        }
    },
    act: async (req, res, next) => {
        console.log(req.query)
        try {

            const category = await Category.findByIdAndUpdate(req.query._id, { state: 1 }, { new: true });
            if (!category) return res.status(404).json({ message: 'category not found' });
            res.status(200).json(category)

        } catch (e) {
            next(e);
        }
    },
    desact: async (req, res, next) => {

        try {

            const category = await Category.findByIdAndUpdate(req.query._id, { state: 0 }, { new: true });
            if (!category) return res.status(404).json({ message: 'category not found' });
            res.status(200).json(category)


        } catch (e) {
            next(e)
        }
    }

}
