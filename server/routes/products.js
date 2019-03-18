const express = require('express');
const router = express();
const ProductController = require('../controllers/productController');
// const Authentication = require('../middlewares/authentication.js')
// const images = require('../helpers/images')
/* GET users listing. */

router.post('/register', ProductController.create);

// router.post('/register', images.multer.single('image'), images.sendUploadToGCS, ProductController.create);
// router.get('/myproduct', ProductController.displayListArticleByUserId)
// router.get('/myproduct/:id', ProductController.displayIndividualProduct)

// router.put('/edit/:id', images.multer.single('image'), images.sendUploadToGCS, ProductController.editIndividualProduct)
// router.delete('/delete/:id', ProductController.deleteIndividualProduct)


module.exports = router;