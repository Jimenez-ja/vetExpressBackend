const { Schema, model } = require('mongoose');

const PaymentSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'El usuario es obligatorio']
    },
    status: {
        type: String,
        required: [true, 'El estado es obligatorio']
    },
    update_time: {
        type: String,
        required: [true, 'La fecha de creacion es obligatoria ']
    },
    payer: {
        type: Object,
        required: [true, 'El comprador es obligatorio']
    },
    date: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    time: {
        type: String,
        required: [true, 'La hora es obligatoria']
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'service',
        required: [true, 'El servicio es obligatorio']
    },
    amount: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    status_appointment: {
        type: String,
        default: 'POR ASISTIR'
    }
})

module.exports = model('payment', PaymentSchema);