const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const UserContoller = require('../controllers/user.controller')

router.use('/products',require('./product.route'))
router.use('/users',auth,require('./user.route'))

// auth
router.post('/login',UserContoller.login)
router.get('/logout',auth,UserContoller.logout)

module.exports = router