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
        <router-link class="btn btn-primary" id="buy_button" :to="'/product/' + product.id +'/buy/' ">Buy</router-link>
        <router-view />
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js';

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