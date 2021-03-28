<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">Fancy Ecommerce</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cartlist">Cart List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!isLogin">Login</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout" v-if="isLogin">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      isLogin: localStorage.getItem('access_token')
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push('/login').catch(err => { console.log(err) })
    }
  }
}
</script>

<style scoped>

</style>
