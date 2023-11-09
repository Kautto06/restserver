const {Router} = require('express')
const { check } = require('express-validator')
const { obtenerProductos, obtenerProducto, actualizarProducto, crearProducto, borrarProducto } = require('../controllers/productos')
const { existeCategoriaPorId, idExiste, esRoleValido, existeProductoPorId } = require('../helpers/db-validators')
const { validarJWT, esAdminRole } = require('../middlewares')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

router.get('/',obtenerProductos)


router.get('/:id',[
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)

router.put('/:id',[
    validarJWT,
    check('categoria','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto)


module.exports = router