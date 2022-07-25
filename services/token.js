import jsonwebtoken from 'jsonwebtoken';
import models from '../models';
console.log(models.User)

async function checkToken(token) {
    let __id = null;
    try {
        const { _id } = await jsonwebtoken.decode(token);
        __id = _id;
    } catch (e) {
        console.log("otro error\n", e)
        console.log(_id)
        // invalid token
        return false;
    }
    const user = await models.User.findOne({ _id, estado: 1 });
    if (!user) return false;
    const newToken = await jsonwebtoken.sign({ _id: _id }, 'secretapp', { expiresIn: 'id' });

    return { newToken, rol: user.rol };
}
export default {
    generateToken: (_id, rol, email) => {
        return jsonwebtoken.sign({ _id: _id, rol: rol, email: email }, 'secretapp', { expiresIn: '3d' })
    },
    getUser: async (token) => {
        try {
            const { _id } = jsonwebtoken.verify(token, 'secretapp');
            const user = await models.User.findOne({ _id: _id, state: 1 });

            if (!user) return false;

            return user;
        } catch (e) {
            //because is expired token
            //const newToken = await checkToken(newToken);
            return false;

        }
    }
}