const Service = require('../models/service');


const getServices = async(req, res) => {

    const { start = 0, end = 10 } = req.query;

    const [total, service] = await Promise.all([
        Service.countDocuments({ state: true }),
        Service.find({ state: true })
        .skip(Number(start))
        .limit(Number(end))
    ])


    res.status(200).json({
        total,
        service
    })

}

const getService = async(req, res) => {

    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
        return res.status(404).json({
            err: "No se encontro el servicio"
        })
    }

    res.json({
        service
    })

}

const postService = async(req, res) => {

    const { name, description, price, namePerson, time } = req.body;


    const service = new Service({ name, price, namePerson, time, description });

    try {
        await service.save();
        return res.status(201).json({
            service
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            err: error
        })
    }

}

const putService = async(req, res) => {

    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
        return res.status(404).json({
            err: "No se encontro el servicio"
        })
    }

    const {
        name = service.name,
            priceP = service.price.pequeños,
            priceM = service.price.medianos,
            priceG = service.price.grandes,
            namePerson = service.namePerson,
            time = service.time,
            description = service.description
    } = req.body;

    service.name = name;
    price = {
        pequeños: priceP,
        medianos: priceM,
        grandes: priceG
    };
    service.price = price;
    service.namePerson = namePerson;
    service.time = time;
    service.description = description;

    try {
        await service.save();
        return res.json({
            ok: "Se actualizo correctamente"
        })
    } catch (error) {
        return res.status(400).json({
            err: error
        })
    }

}

const deleteService = async(req, res) => {

    const { id } = req.body;

    const service = await Service.findById(id);


    if (!service) {
        return res.status(404).json({
            err: 'Servicio no encontrado'
        })
    }

    service.state = false;

    try {
        service.save();
        return res.json({
            ok: 'Servicio borrado correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            err: error
        })
    }

}
module.exports = {
    getService,
    postService,
    getServices,
    deleteService,
    putService
}