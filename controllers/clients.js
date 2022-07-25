import MClient from "../models/Client";
const { Client, validateClient } = MClient;

export default {

    add: async (req, res, next) => {

        try {
            const client = new Client(req.body);
            await client.save();
            res.status(200).json(client);

        } catch (e) {
            next(e)
        }
    },
    list: async (req, res, next) => {
        try {
            const clients = await Client.find().sort('name');
            res.status(200).json(clients)
        } catch (e) {
            next(e)
        }
    },
    query: async (req, res, next) => {
        try {
            const client = await Client.findById(req.query.id);
            if (!client) return res.status(200).send({ message: "clien dosen't exists" })
            res.status(200).json(client)

        } catch (e) {
            next(e)
        }
    },
    update: async (req, res, next) => {
        const { error } = validateClient(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        try {

            const client = await Client.findByIdAndUpdate(req.query.id, req.body, { new: true });
            if (!client) return res.status(404).json({ message: "client dosen't exists" })
            res.status(200).json(client);

        } catch (e) {
            next(e)
        }
    },
    remove: async (req, res, next) => {
        try {
            const client = await Client.findByIdAndDelete(req.query.id);
            if (!client) return res.status(404).json({ message: "client dosen't exists" })
            res.status(200).json(client);
        } catch (e) {
            next(e)
        }
    },
    act: async (req, res, next) => {
        try {
            const client = await Client.findByIdAndUpdate(req.query.id, { state: 1 }, { new: true });
            if (!client) return res.status(404).json({ message: "client dosen't exists" })
            res.status(200).json(client);

        } catch (e) {
            next(e)
        }
    },
    desact: async (req, res, next) => {
        try {
            const client = await Client.findByIdAndUpdate(req.query.id, { state: 0 }, { new: true });
            if (!client) return res.status(404).json({ message: "client dosen't exists" })
            res.status(200).json(client);
        } catch (e) {
            next(e)
        }
    },
}