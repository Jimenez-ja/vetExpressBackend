const { Schema, model } = require('mongoose');


const PetSchema = Schema({

    type: {
        type: String,
        require: [true, 'El tipo es obligatorio']
    },
    race: {
        type: String,
        require: [true, 'La raza es obligatoria']
    },
    size: {
        type: String,
        require: [true, 'El tamaño es obligatorio']
    },
    sex: {
        type: String,
        require: [true, 'El sexo es obligatorio']
    },
    age: {
        type: Number,
        require: [true, 'La edad es obligatoria']
    },
    name: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'El propietario es obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    },


})

module.exports = model('pet', PetSchema);