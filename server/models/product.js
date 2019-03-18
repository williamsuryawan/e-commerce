const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema ({
    name: {type: String},
    amount: {type: Number},
    price: {type: Number}
    // productuserid: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
})

const Productlist = mongoose.model('Productlist', ProductSchema)

module.exports = Productlist