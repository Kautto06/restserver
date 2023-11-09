
const Role = require('../models/role')
const Usuario =  require('../models/user')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')
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

const existeCategoriaPorId = async (id) => {
    const existeUser = await Categoria.findById(id)
    if (!existeUser) {
        throw new Error(`El id no existe ${id}`)
    }
}

const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion)
    if(!incluida) throw new Error(`La coleccion ${ coleccion} no es permitida - ${colecciones}`)
    return true
}

module.exports = {
    esRoleValido,
    emailExiste,
    idExiste,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}


