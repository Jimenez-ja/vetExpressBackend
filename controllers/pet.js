const Pet = require('../models/pet');

const getPets = (req, res) => {
    res.json({
        err: "ok get"
    })
}

const postPet = async(req, res) => {

    const { type, race, size, sex, age, name } = req.body;

    const { authUser } = req;

    const id = authUser._id;

    const pet = new Pet({ type, race, size, sex, age, name, owner: id });

    try {
        await pet.save();
        res.status(201).json({
            pet
        })
    } catch (error) {
        res.status(400).json({
            err: error
        })
    }
}

const getOwnerPet = async(req, res) => {

    const { _id: id } = req.authUser;

    const pet = await Pet.find({ owner: id })
        .populate('owner', ['name', 'email']);

    res.json({
        pet
    })
}




module.exports = {
    getPets,
    postPet,
    getOwnerPet
}