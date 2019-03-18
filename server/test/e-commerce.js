const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should

const mongoose = require('mongoose')
const app = require('../app.js')

chai.use(chaiHttp)

describe('/POST products', function (){
    describe ('success', function () {
        it('should create a new product', function (done) {
            chai
                .request(app)
                .post('/products/register')
                .send({
                    "name": 'handphone',
                    "amount": 7,
                    "price": 10000
                })
                .then(response => {
                    response.should.have.status(201)
                    response.body.should.be.an('object')
                    response.body.should.have.property('_id')
                    response.body.should.have.property('name')
                    response.body.should.have.property('amount')
                    response.body.should.have.property('price')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe ('fail', function () {

    })
})

describe ('GET products', function(){
    describe('success: ', function() {
        it('should list the created product in the product list', function (done) {
            chai
                .request(app)
                .get('/products')
                .then(response => {
                    response.should.have.status(200)
                    response.body.should.be.an('array')
                    done()
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

    describe('fail: ', function () {

    })
})

describe ('/DEL products', function () {
    describe('success: ', function (){
        it('should delete the selected products in the product list', function(done) {
            chai
                .request(app)
                .delete(`/products/${productId}`)
                .set('token', adminToken)
                .then(response => {
                    response.should.have.status(200)
                    response.should.be.an('object')
                    response.body.should.have.property('message')
                    response.body.message.have.equal(`${res.body.product.name} has been deleted`)
                    done()
                })
        })
    })
    describe('fail: ', function (){
        
    })
})

describe ('/POST login', function () {
    describe('success: ', function () {
        it('should allow user to login if his email is registered and the password is true', function () {
            chai
                .request(app)
                .post('users/login')
                .send({
                    email: 'william@gmail.com',
                    password: '12345'
                })
                .then(response => {
                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    response.body.should.have.property('isLogin');
                    response.body.should.have.property('message');
                    response.body.should.have.property('token');
                    response.body.isLogin.should.have.equal(true);
                    done();
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe ('fail: ', function () {

    })
})

describe ('/POST put items to cart', function () {
    describe('success: ', function() {
        it('allow logged in user to put product to his cart', function () {
            chai
                .request(app)
                .post('/products/buy')
                .set('token', token)
                .send(product)
                .then(response => {
                    response.should.have.status(200)
                    response.body.should.be.an('object')
                    response.body.should.have.property('message')
                    response.body.message.have.equal(`${product.name} has been added to cart`)
                })
        })
    })
    describe('fail:', function () {

    })
})