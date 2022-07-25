import tokenService from '../services/token';

export default {
    verifyUser: async (req, res, next) => {

        const token = req.header('token');
        if (!token) return res.status(401).send("no token provided");

        try {
            const user = await tokenService.getPaylod(req.headers.token)
            if (user.rol == 'admin' || user.rol == 'vendedor' || user.rol == 'almacenero') { next(); }
            else { res.status(403).json({ message: 'no autorizado' }) }

        } catch (e) {
            res.status(500).json({ message: 'invalid token' });
        }
    },

    verifyAdmin: async (req, res, next) => {

        const token = req.header('token');

        if (!token) return res.status(401).send("no token provided");

        try {
            const user = await tokenService.getUser(token)

            if (user.rol === "admin") { next(); }
            else { res.status(403).json({ message: 'no autorizado' }) }

        } catch (e) {
            res.status(500).json({ message: 'invalid token' });
        }
    },

    verifyVendedor: async (req, res, next) => {

        const token = req.header('token');
        if (!token) return res.status(401).send("no token provided");

        try {
            const user = await tokenService.getUser(token);
            if (user.rol == 'vendedor' || user.rol == 'admin') { next(); }
            else { res.status(403).json({ message: 'no autorizado' }) }

        } catch (e) {

            res.status(500).json(e);

        }
    },
    verifyAlmacenero: async (req, res, next) => {

        const token = req.header('token');

        if (!token) return res.status(401).send("no token provided");

        try {
            const user = await tokenService.getUser(token)
            if (user.rol == 'almacenero' || user.rol == 'admin') { next(); }
            else { res.status(403).json({ message: 'no autorizado' }) }

        } catch (e) {
            res.status(500).json({ message: 'internal server error' });
        }
    },
}