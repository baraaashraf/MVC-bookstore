const productController = require('../controllers/product.controller')

const router = require('express').Router()

router.get('/',productController.getProduct)

router.get('/:id',productController.getProductById)




module.exports = router