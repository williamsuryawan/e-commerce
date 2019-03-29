# e-commerce
# Created by William Suryawan

## Base URL
### Server: http://localhost:3000
### Admin: http://localhost:8080

## User Routing
Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/users/login|POST||email:String(**Required**)<br>password:String(**Required**)|Error:<br>Wrong username/password<br>Success:<br>login success|login to the website
/users/register|POST||name:String(**Required**)<br>email:String(**Required**)<br>password:String(**Required**)|Error:<br>email have been registered<br>Success:<br>customers have been login successfully|register new user to the website
users/login/admin|POST||email:String(**Required**)<br>password:String(**Required**)|Error:<br>Wrong username/password<br>Success:<br>admin login success|admin login to the website

## Admin Access
```
email: admin@gmail.com
password: 1234
```

## Product Routing

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/products|GET|token:**Not Required**||Error:<br>Internal server error<br>Success:<br>show the product list|view all products to buy
/products/:id|GET|token:**Not Required**||Error:<br>Internal server error<br>Success:<br>show the product detail|view product detail to buy
/products/register |POST|token:String(**Required**)|name:String(**Required**)<br>amount:Number(**Required**) price:Number(**Required**) picture:File(**Required**)|Error:<br>Internal server error<br> Not valid Admin Token <br>Success:<br>success add product to the website|add product to ecommerce website
/products/edit/:id|PUT|token:String(**Required**) <br> productId:String(**Required**)||Error:<br>Internal server error<br> Not valid Admin Token <br>Success:<br>edit product success|edit product for ecommerce website
/products/delete/:id|DELETE|token:String(**Required**) <br> productId:String(**Required**)||Error:<br>Internal server error<br> Not valid Admin Token <br>Success:<br>delete product success|delete product from ecommerce website


## Cart Routing

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/carts | GET | token:String(**Required**) || Error: <br> Internal server error <br> No Token available <br>Success:<br>success show cart  | view cart
/carts | POST | token:String(**Required**) | _id:String(**Required**) <br> amount:Number (**Required**) | Error: <br> No Authorization <br> amount less than 1 <br> amount more than available stock <br>Success:<br>success add product to the cart  | Add product and amount into cart (Authorization: only owner who can add products to his cart)
/carts/reduce | PUT | token:String(**Required**) | _id:String(**Required**) <br> amount:Number (**Required**) | Error: <br> No Authorization <br>Success:<br>success add product to the cart  | reduce product and amount into cart (Authorization: only owner who can add products to his cart)
/carts/empty | PUT | token:String(**Required**) || Error: <br> No Authorization <br> Success:<br>success add product to the cart  | remove all products from the cart (Authorization: only owner who can add products to his cart)