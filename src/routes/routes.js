const router = require('express').Router()


router.use('/products',require('./product.route'))
router.use('/users',require('./user.route'))

module.exports = router