
const { Schema, model} = require('mongoose')

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        require: [true,'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default : true
    },
    google: {
        type: Boolean,
        default: false
    },
});


UsuarioSchema.methods.toJSON = function () {
    const {__v,password,_id,correo, ...user } = this.toObject()
    user.uid =_id
    return user
}

module.exports = model('User',UsuarioSchema);