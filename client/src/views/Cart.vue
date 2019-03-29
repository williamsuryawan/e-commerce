<template>
    <div>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-sm-5">
                    <h2>This is My Cart</h2>
                </div>
                <div class="col-sm-5">
                    <h2>Total: {{totalBill}}</h2>
                </div>
                <div class="col-sm-2">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#checkOutModal">Check-Out</button>
                </div>
            </div>
            <div class="row">
                <h6> Note: Please refresh your cart if your product amount is not updated after you press add/minus button :)</h6>
            </div>
        </div>
        
        <ul>
            <li style="list-style-type:none">
                <div v-for="product in products" :key="product._id">
                <div class="container col-12" style="background-color: rgb(209, 209, 209); color: black; padding:10px">    
                    <div class="row">
                        <div class="col-sm-2">
                            <img v-bind:src="product.productId.link" width="130" height="100">
                        </div>
                        <div class="col-sm-5 offset-sm-2" style="padding:0px">
                            <a href="#">
                            <h5>{{product.productId.name}}</h5></a>
                            <h6>Amount to Buy: {{product.qty}}</h6>
                            <h6>SubTotal: {{product.productId.price * product.qty}} </h6>

                        </div>
                        
                        <div class="col-sm-3" style="padding:30px">
                            
                            <button class="btn btn-primary" id="add_button" @click.prevent="addAmount(product.productId)">+</button>
                            <button class="btn btn-primary" id="add_button" @click.prevent="redAmount(product.productId)">-</button>
                        </div>   
                    </div>
                </div>

                </div>
            </li>
        </ul>

        <!-- Modal for CheckOut and Emptying Cart -->
        <div class="modal fade" id="checkOutModal" tabindex="-1" role="dialog" aria-labelledby="newTaskCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Checkout to Payment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <p> You will be directed to payment page</p> <br>
                    <button type="submit" class="btn btn-primary" @click.prevent="goToCheckOut" data-dismiss="modal">Continue to Payment</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>


<script>
import server from "@/api/server.js";
import swal from 'sweetalert';

export default {
  name: "Cart",
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
      console.log("masuk ke show cart")
      server
        .get("/carts", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
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
    addAmount (product) {
       console.log("masuk sini ke method add produk:", product)
        if (!localStorage.getItem("token")) {
            swal("you have to login first!", {
            buttons: ["continue browsing", "login now"]
            }).then(value => {
            if (value) this.$router.push("/login");
            });
        } else {
            server
            .post("/carts", {
                    _id: product._id,
                    amount: 1},
                { headers: {
                    token: localStorage.getItem("token")
                }})
            .then(({ data }) => {
                console.log("berhasil nambah barang")
                this.$router.push("/carts");
                this.getUserCart();
            })
            .catch(({ response }) => {
                console.error(response);
            });
        }
    },
    redAmount (product) {
       console.log("masuk sini ke method minus produk:", product)
        if (!localStorage.getItem("token")) {
            swal("you have to login first!", {
            buttons: ["continue browsing", "login now"]
            }).then(value => {
            if (value) this.$route.push("/login");
            });
        } else {
            server
            .post(
                "/carts",
                {
                _id: product._id,
                amount: -1
                },
                {
                headers: {
                    token: localStorage.getItem("token")
                }
                }
            )
            .then(({ data }) => {
                console.log("berhasil kurangi barang")
                this.$router.push("/carts");
                this.getUserCart();
            })
            .catch(({ response }) => {
                console.error(response);
            });
        }
    },
    goToCheckOut () {
        this.$router.push({ path: "/checkout" });
    },
  }
}
</script>
