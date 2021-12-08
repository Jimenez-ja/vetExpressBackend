const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    rol: {
        type: String,
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    },
    emailValidate: {
        type: Boolean,
        default: false
    },
    tel: {
        type: String,
        default: "N/A"
    }

})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();

    user.uid = _id;

    return user

}

module.exports = model('user', UserSchema);