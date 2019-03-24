<template>
  <div class="home">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="../assets/slide1.jpg" alt="First slide">
          <div class="carousel-caption d-none d-md-block" >
            <div class="col w-100" style="color: black; background-color: white">
            <router-link to="/products"><h1>SHOP NOW</h1></router-link>
            <h3>New Collection Available Now!</h3>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../assets/slide2.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../assets/slide3.jpg" alt="Third slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="col mt-5 mb-5 ml-1">
      <div class="row">
        <div class="col-sm-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Ecommerce for Sandals</h5>
              <h6 class="card-subtitle mb-2 text-muted">Special Men Sandal</h6>
              <p class="card-text">The most complete sandals for Men on our website with the latest design from a lot of brands.</p>
              <a href="#" class="card-link"><router-link to="/products">SHOP NOW</router-link></a>

            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">DISCOUNTS!!</h5>
              <h6 class="card-subtitle mb-2 text-muted">Special Price Available Here</h6>
              <p class="card-text">Why pay more if we can pay less for the same product? Save your money with high quality product. </p>
              <a href="#" class="card-link"><router-link to="/products">SHOP NOW</router-link></a>

            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">ALWAYS NEW</h5>
              <h6 class="card-subtitle mb-2 text-muted">No Worry about Late Style</h6>
              <p class="card-text">Our continual updated product will make you following current lifestyle</p>
              <a href="#" class="card-link"><router-link to="/products">SHOP NOW</router-link></a>

            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">HIGH QUALITY</h5>
              <h6 class="card-subtitle mb-2 text-muted">No bad quality products</h6>
              <p class="card-text">We provide special quality product for our special and beloved customers</p>
              <a href="#" class="card-link"><router-link to="/products">SHOP NOW</router-link></a>

            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
