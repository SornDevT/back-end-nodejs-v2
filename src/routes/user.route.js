const router = require('express').Router()
const UserContoller = require('../controllers/user.controller')

/// get all user
router.get('/',UserContoller.GetAllUser)

// get by id
router.post('/:id',UserContoller.GetUserById)

// get query string 
router.get('/search',UserContoller.SearchUser)

// post add user 
router.post('/',UserContoller.AddNewUser)

// put update product, get by param
router.put('/:id',UserContoller.UpdateUser)

// delete product by id

router.delete('/:id',UserContoller.DelUser)

module.exports = router