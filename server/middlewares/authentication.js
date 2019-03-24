const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Cart = require('../models/cart')

module.exports = {
    authentication: function (req,res, next) {
        if(req.headers.hasOwnProperty('token')) {
            console.log("Masuk verifikasi JWT", req.headers.hasOwnProperty('token'))
            try {
                const decoded = jwt.verify(req.headers.token, process.env.SECRETKEY);
                console.log("Hasil verifikasi JWT", decoded)
                if (decoded != null) {
                    User.findOne({
                        email: decoded.email
                    })
                    .then(user => {
                        req.loggedInUser = user
                        next()
                    })
                }
            } catch (err) {
                res.status(400).json({
                    message: 'Invalid Token'
                })
            }
        } else {
            res.status(400).json({
                message: 'Please provide token'
            })
        }
    },
    authorization: function(req, res, next) {
        const decoded = jwt.verify(req.headers.token, process.env.SECRETKEY);
        console.log("masuk authorization process", req.loggedInUser)
        Cart
            .findOne({userId: req.loggedInUser._id})
            .then(cart => {
                req.authorizedCart = cart;
                console.log("hasil authorized cart", req.authorizedCart)
                next();
            })
            .catch(error => {
                res.status(400).json({error: 'not authorizated for this cart'})
            })
    },
    adminVerification: function (req,res, next) {
        if(req.headers.hasOwnProperty('token')) {
            console.log("Masuk verifikasi JWT", req.headers.hasOwnProperty('token'))
            try {
                const decoded = jwt.verify(req.headers.token, process.env.SECRETKEY)
                console.log("Hasil verifikasi JWT", decoded)
                if (decoded != null) {
                    User.findOne({
                        email: decoded.email
                    })
                    .then(user => {
                        if(user.role == 'admin') {
                            req.loggedInUser = user;
                            next();
                        } else {
                            res.status(400).json({
                                message: 'Not Admin Token'
                            })
                        }
                    })
                }
            } catch (err) {
                res.status(400).json({
                    message: 'Invalid Token'
                })
            }
        } else {
            res.status(400).json({
                message: 'Please provide token'
            })
        }
    }
}