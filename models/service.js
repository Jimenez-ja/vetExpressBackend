const { Schema, model } = require('mongoose');

const ServiceShema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    price: {
        type: Object,
        required: [true, 'El precio del servicio es obligatorio']
    },
    namePerson: {
        type: String,
        required: [true, 'El nombre de la person es obligatorio']
    },
    time: {
        type: String,
        required: [true, 'El tiempo aproximado es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    state: {
        type: Boolean,
        default: true
    }

})

module.exports = model('service', ServiceShema);