<template>
  <div class="card-col col-lg-4 mb-4">
    <div class="card shadow">
      <img :src="data.image_url" alt="" class="card-img-top">
      <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p class="card-text">{{data.name}}</p>
          <h5 class="card-title">Price</h5>
          <p class="card-text">{{data.price}}</p>
          <h5 class="card-title">Stock</h5>
          <p class="card-text">{{data.stock}}</p>
      </div>
      <div class="card-footer col-12">
        <a href="" class="btn btn-outline-success btn-md" @click.prevent="addCart"><i class="fas fa-cart-plus"></i>Add to cart</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['data'],
  methods: {
    addCart () {
      const loggedin = localStorage.getItem('access_token')
      if (!loggedin) {
        this.$router.push('/login')
      } else {
        this.$store.dispatch('addCart', this.data.id)
      }
    }
  }
}
</script>

<style>
img {
  max-width: 400px;
  max-height: 400px;
  height: auto;
}
.card {
  width: 400px;
  border-radius: 15px;
}
.card-col {
  width: 450px;
  display: flex;
  justify-content: center;
}
.card-body {
  text-align: center;
}
.btn{
  width: inherit;
}
</style>
