const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect()
const should = chai.should()

const mongoose = require('mongoose')
const app = require('../app.js')

chai.use(chaiHttp)

let adminTokenTest = '';
let custTokenTest = '';
let itemId = '';
let cartId = '';

// USER 
//     CRUD
//     C create users (customer & admin)
//     R login users (customer & admin)
// PRODUCTS
//     CRUD 
//     C create products (admin only)
//     R lihat semua produk (all users, without authentication)
//     R lihat detail produk (all users, without authentication)
//     U update informasi produk (admin only)
//     D hapus produk (admin only)

// TRANSACTION
//     CRUD
//     C create transaction, put product to cart (need authentication with customer token)
//     R see products in cart (need authentication with customer token)
//     U update product in cart (need authentication with customer token)
//     D remove product in cart (need authentication with customer token)

// USER
//     REGISTRASI
//     Input: name, email, password
//     1 sukses registrasi OK
//     2 gagal registrasi: email tidak boleh kosong
//     3 gagal registrasi: password tidak boleh kosong
//     4 gagal registrasi: email harus unik
    
//     LOGIN CUSTOMER
//     Input: email, password
//     5 sukses login OK
//     6 gagal login: email tidak tersedia
//     7 gagal login: password salah 

//     LOGIN ADMIN
//     Input: email, password
//     8 sukses login
//     9 gagal login: email tidak tersedia
//     10 gagal login: password salah

// PRODUCTS
//     CREATE
//     Input: name, adminToken, description, amount, price
//     11 sukses create
//     12 gagal create: nama tidak boleh kosong
//     13 gagal create: nama tidak boleh sama 

//     READ (all products)
//     Input: - 
//     14 sukses read all products OK
//     15 gagal read : server error 

//     READ (detail products)
//     Input: productId 
//     16 sukses lihat detail product OK
//     17 gagal read: server error 

//     UPDATE 
//     Input: productId, adminToken, name, description, amount, price
//     18 sukses update detail produk
//     19 gagal update: tidak ada token
//     20 gagal update: bukan token admin
//     21 gagal update: server error

//     DELETE
//     Input: productId, adminToken
//     22 sukses remove detail produk
//     23 gagal remove: tidak ada token
//     24 gagal remove: bukan token admin
//     25 gagal remove: server error

// TRANSACTION
//     CREATE
//     Input: productId, customerToken
//     26 sukses masukkan produk ke cart
//     27 gagal create: tidak ada token
//     28 gagal create: bukan token customer
//     29 gagal create: server error

//     READ
//     Input: customerToken, productuserId
//     30 sukses melihat produk di cart
//     31 gagal read: tidak ada token
//     32 gagal read: bukan token customer
//     33 gagal read: server error

//     UPDATE
//     Input: customerToken, productuserId, amount
//     34 sukses melihat produk di cart
//     35 gagal update: tidak ada token
//     36 gagal update: bukan token customer
//     37 gagal update: server error

//     DELETE
//     Input: customerToken, productuserId
//     38 sukses melihat produk di cart
//     39 gagal remove: tidak ada token
//     40 gagal remove: bukan token customer
//     41 gagal remove: server error

// TESTING USERS STARTS HERE

// describe ('/POST register', function () {
//     describe('success: ', function () {
//         it('should return an object and status 201', function(done) {
//             chai
//                 .request(app)
//                 .post('/users/register')
//                 .send({
//                     'name': 'William',
//                     'email': 'william@gmail.com',
//                     'password': '1234'
//                 })
//                 .end(function (err,res) {
//                     should.not.exist(err);
//                     res.should.have.status(201);
//                     res.body.should.be.an('object');
//                     res.body.should.have.property('_id');
//                     res.body.should.have.property('name');
//                     res.body.should.have.property('email');
//                     res.body.should.have.property('password');
//                     done();
//                 })
//         })
//     })
//     describe('fail: ', function () {
//         it('should not allow user to register if the email is empty', function (done) {
//             chai
//                 .request(app)
//                 .post('users/register')
//                 .send({
//                     "name": 'William',
//                     "email": '',
//                     "password": '1234'
//                 })
//                 .end (function (err,res){
//                     console.log("testing result:", err, res)
//                     // should.not.exist(err)
//                     // err.should.have.status(409);
//                     // err.should.be.null;
//                     // res.should.have.status(409);
//                     // res.body.should.be.an('object');
//                     done();
//                 })
//         })
//         // it('should not allow user to register if the password is empty', function (done) {})
//         // it('should not allow user to register if the email is already registered', function (done) {})

//     })
// })
describe ('/POST login customer', function () {
    describe('success: ', function () {
        it('should allow user to login if his email is registered and the password is true', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send({
                    email: 'william@gmail.com',
                    password: '1234',
                    loginVia: 'website'
                })
                .end(function(err,res) {
                    console.log("hasil testing login ===>", err, res.body)
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('token');
                    custTokenTest = res.body.token;
                    done();
                })
        })
    })
    // describe ('fail: ', function () {

    // })
})

describe ('/POST login admin', function () {
    describe('success: ', function () {
        it('should allow admin to login if his email is registered and the password is true', function (done) {
            chai
                .request(app)
                .post('/users/login/admin')
                .send({
                    email: 'admin@gmail.com',
                    password: '1234',
                })
                .end(function(err,res) {
                    console.log("hasil testing login admin ===>", err, res.body)
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('adminToken');
                    adminTokenTest = res.body.adminToken;
                    done();
                })
        })
    })
    // describe ('fail: ', function () {

    // })
})

// // TESTING PRODUCTS STARTS HERE

// describe('/POST products', function (){
//     describe ('success', function () {
//         it('should create a new product', function (done) {
//             chai
//                 .request(app)
//                 .post('/products/register')
//                 .send({
//                     "name": 'handphone',
//                     "stock": 7,
//                     "price": 10000
//                 })
//                 .end(function(err,res) {
//                     console.log("hasil testing product create", err, res.body)
//                     should.not.exist(err);
//                     res.should.have.status(201)
//                     res.body.should.be.an('object')
//                     res.body.should.have.property('_id')
//                     res.body.should.have.property('name')
//                     res.body.should.have.property('stock')
//                     res.body.should.have.property('price')
//                     done()
//                 })
//         })
//     })
//     // describe ('fail', function () {

//     // })
// })

describe ('GET products', function(){
    describe('success: ', function() {
        it('should list the created product in the product list', function (done) {
            chai
                .request(app)
                .get('/products')
                .end(function(err,res){
                    // console.log("hasil testing get all product", err, res.body)
                    should.not.exist(err);
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    // describe('fail: ', function () {

    // })
})

describe ('GET product detail', function(){
    describe('success: ', function() {
        it('should show product in detail', function (done) {
            let id = '5c95d45c01a3422c85fb1076';
            chai
                .request(app)
                .get(`/products/${id}`)
                .end(function(err,res){
                    console.log("hasil testing get product detail", err, res.body)
                    should.not.exist(err);
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('_id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('stock')
                    res.body.should.have.property('price')
                    done()
                })
        })
    })

    // describe('fail: ', function () {

    // })
})


// describe ('/DEL products', function () {
//     describe('success: ', function (){
//         it('should delete the selected products in the product list', function(done) {
//             chai
//                 .request(app)
//                 .delete(`/products/${productId}`)
//                 .set('token', adminToken)
//                 .end(function(err,res) {
//                     err.should.be.null;
//                     res.should.have.status(200)
//                     res.should.be.an('object')
//                     res.body.should.have.property('message')
//                     res.body.message.have.equal(`${res.body.product.name} has been deleted`)
//                     done()
//                 })
//         })
//     })
//     // describe('fail: ', function (){
        
//     // })
// })


// describe ('/POST put items to cart', function () {
//     describe('success: ', function() {
//         it('allow logged in user to put product to his cart', function (done) {
//             chai
//                 .request(app)
//                 .post('/products/buy')
//                 .set('token', token)
//                 .send(product)
//                 .end(function(err,res) {
//                     err.should.be.null;
//                     res.should.have.status(200)
//                     res.body.should.be.an('object')
//                     res.body.should.have.property('message')
//                     res.body.message.have.equal(`${product.name} has been added to cart`)
//                     done();
//                 })
//         })
//     })
//     // describe('fail:', function () {

//     // })
// })