import MUser from "../models/User";
import bcrypt from "bcryptjs/dist/bcrypt";
import _token from "../services/token";

const { User, validateUser } = MUser;
export default {

    add: async (req, res, next) => {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message })

        try {
            const user = new User(req.body);

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            await user.save(user);
            res.status(200).json(user);

        } catch (e) {
            next(e)
        }
    },
    list: async (req, res, next) => {
        try {
            const users = await User.find().select('name rol email tipo_doc nro_doc phone password createdAt state');
            res.status(200).json(users);

        } catch (e) {
            next(e)
        }
    },
    query: async (req, res, next) => {
        try {
            const user = await User.findById(req.query.id);
            if (!user) return res.status(404).json({ message: "user not found" });
            res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    },
    update: async (req, res, next) => {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message })
        try {

            let password = req.body.password;
            const old_user = await User.findById(req.query.id);
            if (!old_user) return res.status(404).json({ message: "user not found" });

            if (old_user.password != req.body.password) {
                password = await bcrypt.hash(password, 10);
            }

            const new_user = await User.findByIdAndUpdate(req.query.id, req.body, { new: true });
            res.status(200).json(new_user);

        } catch (e) {
            next(e)
        }
    },
    remove: async (req, res, next) => {
        try {

            const user = await User.findByIdAndDelete(req.query.id);
            if (!user) return res.status(404).json({ message: "user not found" });
            res.status(200).json(user);

        } catch (e) {
            next(e)
        }
    },
    act: async (req, res, next) => {
        try {

            const user = await User.findByIdAndUpdate(req.query.id, { state: 1 }, { new: true });
            if (!user) return res.status(404).json({ messaje: "User not found" })
            res.status(200).json(user)

        } catch (e) {
            next(e)
        }
    },
    desact: async (req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate(req.query.id, { state: 0 }, { new: true });
            if (!user) return res.status(404).json({ messaje: "User not found" });
            res.status(200).json(user)

        } catch (e) {
            next(e)
        }
    },
    login: async (req, res, next) => {
        console.log(req.body)
        try {

            const user = await User.findOne({ email: req.body.email, state: 1 });
            if (!user) return res.status(404).json({ message: "user not found" });

            const result = await bcrypt.compare(req.body.password, user.password);
            if (!result) return res.status(404).json({ message: "user not found" });

            const token = await _token.generateToken(user._id, user.rol, user.email);
            //res.status(200).header('x-auth-token', token).json(user);
            res.status(200).json({ user, token });

        } catch (e) {
            next(e)
        }
    },



}