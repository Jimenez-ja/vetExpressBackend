const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) return res.status(400).json({ msg: "Token not found" });

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);

        // leer el usuario que corresponde el uid

        const authUser = await User.findById(uid);

        //Verificar que exista el usuario que

        if (!authUser) return res.status(401).json({ msg: 'Invalid token -U:not found' });

        //verificar que el usuario auth este activo

        if (!authUser.state) return res.status(401).json({ msg: 'Invalid token -U:false' });


        req.authUser = authUser;

        next();

    } catch (error) {
        // console.log(error);
        res.status(401).json({ msg: "Invalid token" })
    }

    // console.log(token);


}

module.exports = {
    validateJWT
}