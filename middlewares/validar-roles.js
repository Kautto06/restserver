const { request,response } = require("express")


const esAdminRole = (req=request,res=response ,next) => {
    if(!req.user) return res.status(500).json({msg: 'Se quiere verificar el role sin validar el token primero'})
    const {rol,nombre}=req.user
    if(rol!== 'ADMIN_ROLE') return res.status(401).json({msg: `${nombre} no es admin - No puede hacer eso`})
    next()
}

const tieneRole = ( ...roles ) => {
    return (req,res = response,next) => {
        if(!req.user) return res.status(500).json({msg: 'Se quiere verificar el role sin validar el token primero'})
        if(!roles.includes(req.user.rol)) return res.status(401).json({msg: `El servicio requiere uno de estos roles ${roles}`})


        next()
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}