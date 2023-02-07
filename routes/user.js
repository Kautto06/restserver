
const {Router} = require('express')
const {usersGet,usersPost,usersDelete,usersPatch,usersPut} = require('../controllers/user')
const router = Router()


router.get('/', usersGet)

router.post('/:id', usersPost)

router.put('/', usersPut)

router.delete('/', usersDelete)

router.patch('/', usersPatch)




module.exports = router