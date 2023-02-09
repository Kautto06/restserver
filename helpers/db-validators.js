
const Role = require('../models/role')
const Usuario =  require('../models/user')

const esRoleValido = async(rol='') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${ rol} no esta registrado en la base de datos`);
    }
}
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`)
    }
}

const idExiste = async(id ) => {
    const existeUser = await Usuario.findById(id)
    if (!existeUser) {
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste
}


