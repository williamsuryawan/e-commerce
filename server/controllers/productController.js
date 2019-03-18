// const User = require('../models/user')
const Product = require('../models/product')
// const checkDate = require('../helpers/checkarticleDate')


class productController {
    //create product
    static create(req,res) {
        console.log("Masuk ke function create", req.body)
                let obj = {
                // link: req.file.cloudStoragePublicUrl,
                title: req.body.title,
                text: req.body.text,
                status: req.body.status,
                // productuserid: req.loggedInUser._id
                }

            Product
                .create(obj)
                .then(newproduct => {
                    let newProduct = newproduct
                    res.status(201).json(newproduct)
                    // // Masukkan produk ke user
                    // User.findOneAndUpdate({
                    //     _id: newproduct.productuserid
                    // }, {$push: {listsProduct: newproduct._id}})
                    // .then(user => {
                    //     console.log("Hasil push new product:", user)
                    //     res.status(200).json({
                    //         msg: 'New product successfully created',
                    //         data: newProduct
                    //     })
                    // })
                    // .catch(error => {
                    //     res.status(500).json({
                    //         msg: 'ERROR Create Productlist: ',error
                    //     })
                    // })
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        
        
    }

    
}

module.exports = productController;