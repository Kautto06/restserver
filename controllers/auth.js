const { request,response} = require('express')
const  User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async(req,res =response) => {

    const {correo,password} = req.body
    try{

        const user = await User.findOne({correo})
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        if(!user.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - pasword'
            })
        }

        const token = await generarJWT(user.id)

        res.json({
            user,
            token
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req=request,res = response) => {
    const {id_token} = req.body
    try{
        const {correo,nombre,img} = await googleVerify(id_token)
        let usuario = await User.findOne({correo})
        if(!usuario){
            const data ={
                nombre,
                correo,
                password: ':P',
                img,
                google:true,
                rol: 'USER_ROLE'
            }
            usuario = new User(data)
            await usuario.save()
        }
        
        if(!usuario.estado) return res.status(401).json({ msg: 'Hable con el administrador, usuario bloqueado'})

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch(error){ 
        res.status(500).json({
            msg: 'El token de google no es válido'
        })  
    } 
    
}

module.exports = {
    login,
    googleSignIn
}