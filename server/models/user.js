const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../helpers/hashPassword');

const userSchema = new Schema ({
    name: {
        type: String
    }, 
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
    },
    listsCart: [{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }]
})

userSchema.pre('save', function (next) {
    if(this.password) {
        this.password = hashPassword(this.password);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;