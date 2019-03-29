<template>
    <div v-if="isLoading">
        <p>Please wait</p>
    </div>
    <div class="container" v-else>
        <div>
            <img :src="product.link">
            <h1> Product Name: {{ product.name }} </h1>
            <h3> Price: {{ product.price }} </h3>
            <h3> Stock Available: {{ product.stock }} </h3>
        </div>
        <div>
        <button class="btn btn-primary" id="buy_button" @click.prevent="addToCart(product)">Buy</button>
        <router-view />
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js';
import swal from 'sweetalert';

export default {
    name: 'product-details',
    data() {
        return {
            product: {
                    _id: '',
                    name: '',
                    stock: '',
                    price: '',
                    link: '',
                    cm_enabled: false,
            },
            isLoading: true,
        };
    },
    methods: {
        fetchProduct() {
            this.isLoading = true;
            server
            .get(`/products/${this.$route.params.id}`)
            .then(({ data }) => {
                console.log("berhasil fetch products")
                this.product = data;
                this.isLoading = false;
            })
            .catch((err) => {
                console.log(err);
            })
        },
        addToCart(product) {
            console.log("masuk sini ke method add to cart:", product)
            if (!localStorage.getItem("token")) {
                swal("you have to login first!", {
                buttons: ["continue browsing", "login now"]
                })
                .then(value => {
                if (value) {
                    this.$router.push("/login");
                }});
            } else {
                server
                    .post("/carts", {
                    _id: product._id,
                    amount: 1 },
                    { headers: {
                        token: localStorage.getItem("token")
                    }})
                .then(({ data }) => {
                    console.log("berhasil add to cart")
                    this.$router.push({ path: "/carts" });
                })
                .catch(({ response }) => {
                    console.error(response);
                });
            }
        }
    },
    created() {
    this.fetchProduct();
    },
    // watch: {
    //     $route(to, from) {
    //         this.fetchProduct();
    //     },
    // },
}
</script>