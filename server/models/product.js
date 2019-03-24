const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema ({
    name: {type: String},
    stock: {type: Number},
    price: {type: Number},
    link: {type: String},
    productuserid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Productlist = mongoose.model('Productlist', ProductSchema)

module.exports = Productlist