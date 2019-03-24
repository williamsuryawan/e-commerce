const User = require('../models/user')
const Cart = require('../models/cart')
const bcrypt = require('bcrypt')
const jwtConvert = require('../helpers/jwtConvert')
// const googleSignin = require('../helpers/googleSignIn');


class UserController {
    static register (req,res) {
        console.log("masuk ke method register", req.body)
        User
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: "customer"
            })
            .then(newUser => {
                console.log("hasil create user===>", newUser)
                Cart.create({
                    listsProduct: [],
                    userId: newUser._id})
                    .then(newCart => {
                        console.log("Hasil cart baru", newCart)
                        res.status(201).json(newUser)
                        
                    })
            })
            .catch (err => {
                console.log("Terjadi error ===>", err.errors.email.message)
                if(err.errors.email) {
                    res.status(409).json(err)
                } else if (rr.errors.password) {
                    res.status(409).json(err)
                } else {
                    res.status(500).json(err)
                }
                
            })
    }
    
    static login (req,res) {
        if(req.body.loginVia == 'website') {
            console.log("Masuk ke login via website, input:", req.body)
            User
                .findOne({
                    email: req.body.email
                })
                .then(user => {
                    if(!user) {
                        res.status(400).json({
                            message: `Wrong Email/Password`
                        })
                    } else {
                        console.log("User berhasil ditemukan ====>", user)
                        let isValid = bcrypt.compareSync(req.body.password, user.password)
                        console.log("Cek validity", isValid)
                        if(isValid) {
                            let token = jwtConvert.sign({email: user.email}, process.env.SECRET)
                            res.status(200).json({
                                token: token,
                                id: user._id,
                            })
                        } else {
                            res.status(400).json({
                                message: 'Wrong Email/Password'
                            })
                        }
                    }

                })
        } else if (req.body.loginVia == 'google') {

        }

    }

    static loginAdmin (req,res) {
        console.log("Masuk ke login admin, input:", req.body)
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if(!user) {
                    res.status(400).json({
                        message: `Wrong Email/Password`
                    })
                } else {
                    console.log("Admin berhasil ditemukan ====>", user)
                    if(user.email == 'admin@gmail.com') {
                        let isValid = bcrypt.compareSync(req.body.password, user.password)
                        console.log("Cek validity", isValid)
                        if(isValid) {
                            let token = jwtConvert.sign({email: user.email}, process.env.SECRET)
                            res.status(200).json({
                                adminToken: token,
                                id: user._id,
                            })
                        } else {
                            res.status(400).json({
                                message: 'Wrong Email/Password'
                            })
                        }
                    } else {
                        res.status(400).json({
                            message: 'Not Registered as Admin'
                        })
                    }
                    
                }
            })
    }
}

module.exports = UserController;