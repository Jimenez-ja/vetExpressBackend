const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = (req, res = response) => {

    return res.status(200).json({
        err: 'ok',
        req: 'getUsers'
    })

}

const getTotalUsers = async(req, res) => {

    const user = await User.find({ state: true });

    const total = user.length;
    res.json({
        total
    })
}

const getUser = (req, res = response) => {

    return res.status(200).json({
        err: 'ok',
        req: 'getUser'
    })

}

const postUser = async(req, res = response) => {

    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    user.password = hash;

    try {
        await user.save();
    } catch (err) {
        // console.log(err);
        return res.status(400).json({
            err
        })
    }

    return res.status(200).json({
        err: 'ok',
        user
    })

}

const putUser = async(req, res = response) => {

    const { authUser } = req;

    const user = await User.findById(authUser._id);

    const { name = user.name, tel = user.tel } = req.body;

    user.name = name;
    user.tel = tel;

    try {
        await user.save();
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err: error
        })
    }
}

const deleteUser = (req, res = response) => {

    return res.status(200).json({
        err: 'ok',
        req: 'deleteUser'
    })

}

module.exports = {
    getUsers,
    getUser,
    getTotalUsers,
    postUser,
    putUser,
    deleteUser
}