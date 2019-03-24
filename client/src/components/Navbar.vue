<template>
    <div class="col pt-3" style="background-color:#FFFDD0;">
        <div class="row">
        <div class="col-sm-8">
            <h3>Mini E-Commerce</h3>
        </div>
        <div class="col-sm-1"><router-link to="/"> Home </router-link></div>
        <div class="col-sm-1"><router-link to="/products"> Shop Now </router-link></div>
        <div class="col-sm-1"><router-link to="/login"> Login </router-link></div>
        <div class="col-sm-1"><router-link to="/carts"> My Cart </router-link></div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'navbar',
};
</script>
