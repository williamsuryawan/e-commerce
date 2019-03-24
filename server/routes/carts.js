const express = require('express');
const router = express();
const CartController = require('../controllers/cartController');
const { authentication } = require('../middlewares/authentication.js')
const { authorization } = require('../middlewares/authentication.js')

router.use(authentication)
router.get('/', CartController.seeCart);
router.post('/', authorization, CartController.addProduct);
router.put('/reduce', authorization, CartController.reduceProduct);
router.put('/empty', authorization, CartController.removeAllProducts);

module.exports = router;