<template>
    <div class="col-4 mb-3" >
        <div class="card mx-auto">
            <center><p style="padding:5px"><strong>{{ product.name }}</strong></p></center>
            <div class="card-body">
                <img width="310" height="220" v-bind:src="product.link">

                <div class="row" style="padding:5px">
                    <div class="col-sm-6">
                        <p> IDR {{product.price}}</p>
                    </div>
                    <!-- <div class="col-sm-3">
                        <router-link class="btn btn-primary" id="detail_button" :to="{name: 'product-details', params: {id: product.id}}">Coba</router-link>
                    </div> -->
                    <div class="col-sm-3">
                        <router-link class="btn btn-primary" id="detail_button" :to="'/products/' + product._id ">Detail</router-link>
                    </div>
                    <div class="col-sm-3">
                        <button class="btn btn-primary" id="buy_button" @click.prevent="addToCart(product)">Buy</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script>
import server from '@/api/server.js';
export default {
  props: ['product'],
  name: 'product',
  methods: {
      addToCart(product) {
      console.log("masuk sini ke method add to cart:", product)
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
              amount: 1
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            console.log("berhasil add to cart")
            this.$route.push({ path: "/carts" });
          })
          .catch(({ response }) => {
            console.error(response);
          });
      }
    }
  }
};
</script>
