<template>
  <div>
    <app-navbar />
    <!-- <router-link /> --> 
    <router-view />
    <app-footer />
  </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footbar from '@/components/Footer.vue';

export default {
  components: {
    "app-navbar": Navbar,
    "app-footer": Footbar,
  },
  data() {
    return {
      message: 'Ready to buy something',
    };
  },
  methods: {
    greet() {
      alert('Hello from click');
    },
  },
};
</script>
