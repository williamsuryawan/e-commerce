<template>
    <div class="container">
        <router-view />
        <div class="row">
            <product
                v-for="product in products"
                :product="product"
                :key="product.id" />
        </div>
        
    </div>
</template>

<script>
import productapi from '@/api/productapi';
import Product from '@/components/Product.vue';
import server from '@/api/server.js';

export default {
  name: 'products',
  components: {
    Product,
  },
  data() {
    return {
      products: [{
        _id: '',
        name: '',
        stock: '',
        price: '',
        link: '',
        cm_enabled: false,
      }],
    };
  },
  created() {
    server
      .get('/products')
      .then(({ data }) => {
        this.products = data;
      });
  },
};
</script>
