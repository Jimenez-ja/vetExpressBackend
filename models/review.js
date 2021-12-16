const { Schema, model } = require('mongoose');

const ReviewSchema = Schema({
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'payment',
        required: [true, 'El pago es obligatorio'],
        unique: true
    },
    score: {
        type: Number,
        required: [true, 'La calificacion es obligatoria']
    },
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'service',
        required: [true, 'El servicio es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'El usuario es obligatorio']
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = model('review', ReviewSchema);