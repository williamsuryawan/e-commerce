<template>
    <div>
        <h1><center> Thank you for shopping with us </center></h1>
        <div class="d-flex">
            <div class="col-6">
                <h3><center> Please input your delivery detail </center></h3>
                <form style="border:1px solid black" @submit.prevent="adminLogin">
                    <div class="form-group row" >
                        <div class="col-sm-6 offset-sm-3" style="padding-top:15px;">
                            <center>Street Address</center>
                            <input type="text" class="form-control" id="inputStreet" placeholder="Street Address" v-bind="adLoginEmail">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6 offset-sm-3">
                            <center>City</center>
                            <input type="text" class="form-control" id="inputCity" placeholder="City" v-bind="adLoginEmail">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6 offset-sm-3">
                            <center>Province</center>
                            <input type="text" class="form-control" id="inputCity" placeholder="Province" v-bind="adLoginPassword">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6 offset-sm-3">
                            <center>Zip Code</center>
                            <input type="text" class="form-control" id="inputZipCode" placeholder="Province" v-bind="adLoginPassword">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class=" col-sm-6 offset-sm-3">
                            <center><button type="submit" class="btn btn-primary">Checkout and Save Address</button></center><br>
                            <center><button type="submit" class="btn btn-primary">Checkout without Saving Address</button></center>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-6">
                <h3><center> Payment Detail </center></h3>
                <table style="border: 1px solid black; width:100%">
                    <thead>
                        <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody v-for="product in products" :key="product._id">
                        <tr>
                        <td>{{ product.productId.name }}</td>
                        <td>{{product.qty}}</td>
                        <td>{{product.productId.price * product.qty}}</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <table style="border: 1px solid black; width:100%">
                    <tbody>
                        <tr>
                            <td> Sub-Total </td>
                            <td>IDR {{totalBill}}</td>
                        </tr>
                        <tr>
                            <td> Delivery Charge (Free) </td>
                            <td> IDR 0 </td>
                        </tr>
                        <tr>
                            <td> Total </td>
                            <td> IDR {{totalBill}} </td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <div class="col-6 offset-sm-3">
                    <center><button type="submit" class="btn btn-primary" @click.prevent="goToCart">Continue to Shopping</button></center><br>
                    <center><button type="submit" class="btn btn-primary" @click.prevent="payNow">Pay Now</button></center><br>
                    <center><button type="submit" class="btn btn-primary" @click.prevent="emptyCart">Empty Cart</button></center>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import server from "@/api/server.js";
import swal from 'sweetalert';

export default {
  name: "Check-out",
  data() {
    return {
      carts: "",
      products: [],
      totalBill: 0
    };
  },
  created() {
    this.getUserCart();
  },
  methods: {
    getUserCart() {
      console.log("masuk ke show cart for checkout")
      server
        .get("/carts", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.totalBill = 0;
          console.log("cart ditemukan dari server")
          this.carts = data.data;
          this.products = data.data[0].listsProduct;
          this.products.forEach(product => {
              console.log("Hasil looping===> ", product.productId.price * product.qty)
              this.totalBill += product.productId.price * product.qty;
          })
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    goToCart () {
        this.$router.push({ path: "/carts" });
    },
    payNow () {
        swal({
            position: 'top-end',
            icon: 'success',
            title: `Thank you for shopping with us. Please transfer IDR ${this.totalBill} to our bank account BCA William Suryawan 4731019481`,
            button: true,
        })
    },
    emptyCart() {
      console.log('masuk sini')
      swal({
        title: "Are you sure you want to cancel your order and clear your cart?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
        .then(agree => {
          if (agree) {
            return server
              .put("carts/empty",{}, {
                    headers: { token: localStorage.getItem("token")}
                    })
              .then(() => {
                this.$router.push({ path: "/carts" });
              });
          }
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
  }
}
</script>