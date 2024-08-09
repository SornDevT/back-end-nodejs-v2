
const router = require('express').Router()

const ProductController = require('../controllers/product.controller')

/// get all products
router.get('/',ProductController.GetAllProduct)

// get by id
router.get('/:id',ProductController.GetProductById)

// get query string 
router.get('/search/p',ProductController.SearchProduct)

// post add product 
router.post('/',ProductController.AddNewProduct)

// post upload image
router.post('/uploads',ProductController.Upload)

// put update product, get by param
router.put('/:id',ProductController.UpdateProduct)

// delete product by id

router.delete('/:id',ProductController.DelProduct)

module.exports = router