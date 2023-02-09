
const {Router} = require('express')
const { check } = require('express-validator')
const {usersGet,usersPost,usersDelete,usersPatch,usersPut} = require('../controllers/user')
const { esRoleValido,emailExiste,idExiste } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()


router.get('/', usersGet)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password deber tener 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usersPost)

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExiste),
    check('rol').custom( esRoleValido ),
    validarCampos
], usersPut)

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExiste),
    validarCampos
], usersDelete)

router.patch('/', usersPatch)




module.exports = router