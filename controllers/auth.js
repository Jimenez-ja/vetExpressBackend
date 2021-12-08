const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');



const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ err: "Usuario / Password Incorrecto (correo)" });
        }

        if (!user.state) {
            return res.status(400).json({ err: "Usuario / Password Incorrecto (estado)" });
        }

        if (!user.emailValidate) {
            return res.status(400).json({ err: "Falta validacion de correo electronico" });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ err: "Usuario / Password Incorrecto (password)" });
        }

        const token = await generateJWT(user.id);
        const permissions = user.rol;

        return res.json({
            token,
            permissions
        })

    } catch (error) {

        return res.status(500).json({
            msg: "Hable con el administrador",
            error
        });

    }

}

const validJWT = (req, res) => {

    const { authUser } = req

    return res.json({
        authUser
    })
}


module.exports = {
    login,
    validJWT
}