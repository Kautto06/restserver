const {response,request} = require('express');
const bcrypt = require('bcryptjs') 
const Usuario = require('../models/user');




const usersGet = async(req=request, res=response) =>{
    // const {q,nombre='No name',apikey,page= 1,limit} = req.query
    const {limite=5, desde = 0 } = req.query
    const [total,users] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        users
    })
}

const usersPost = async(req, res=response) =>{
    
    const {nombre, correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password,salt)
    await usuario.save();
    
    res.json({
        usuario
    })
}

const usersPut = async(req, res=response) =>{

    const {id} = req.params
    const {_id,password, google,correo, ...resto} = req.body
    if(password) {
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password,salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    res.json(usuario)
}

const usersDelete = async(req, res=response) =>{
    const {id} =  req.params
    // const user = await Usuario.findByIdAndDelete(id)
    const user = await Usuario.findByIdAndUpdate(id, {estado:false})
    res.json(user)
}

const usersPatch = (req, res=response) =>{
    res.json({
        msg: 'patch API - controlador'
    })
}


module.exports= {
    usersGet,
    usersPost,
    usersDelete,
    usersPut,
    usersPatch

}