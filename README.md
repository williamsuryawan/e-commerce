# e-commerce
# Created by William Suryawan

Routing | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/users/login|POST||email:String(**Required**)<br>password:String(**Required**)|Error:<br>Wrong username/password<br>Success:<br>login success|login to the website
/users/register|POST||name:String(**Required**)<br>email:String(**Required**)<br>password:String(**Required**)|Error:<br>email have been registered<br>Success:<br>customers have been login successfully|register new user to the website
/products |POST|token:String(**Required**)|name:String(**Required**)<br>amount:Number(**Required**) price:Number(**Required**) picture:File(**Required**)|Error:<br>Internal server error<br> Admin only <br>Success:<br>success add item to the website|add item to website
/products|GET|token:String(**Required**)||Error:<br>Internal server error<br>Success:<br>show the product list|view all items to buy
/products/:id|DELETE|token:String(**Required**) <br> itemId:String(**Required**)||Error:<br>Internal server error<br> Admin only <br>Success:<br>delete item success|delete items in website
/cart | POST | token:String(**Required**) | itemId:String(**Required**) <br> cartId:String(**Required**) <br> amount:Number (**Required**) | Error: <br> amount less than 1 <br> amount more than available stock <br>Success:<br>success add item to the cart  | Add item into cart
