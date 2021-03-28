<template>
  <tr>
      <td scope="row"><img :src="data.Product.image_url" alt="" class="card-img-top"></td>
      <td>{{ data.Product.price }}</td>
      <td>{{ data.ammount }}</td>
      <td>{{ data.price }}</td>
      <td><button type="button" class="btn btn-success" @click.prevent="addCart"><i class="fas fa-plus"></i></button></td>
      <td><button type="button" class="btn btn-warning" @click.prevent="minusCart"><i class="fas fa-minus"></i></button></td>
      <td><button type="button" class="btn btn-danger" @click.prevent="deleteCart"><i class="fas fa-trash-alt"></i></button></td>
  </tr>
</template>

<script>
export default {
  name: 'cartComponent',
  props: ['data'],
  methods: {
    addCart () {
      this.$store.dispatch('addEditCart', this.data.Product.id)
    },
    minusCart () {
      this.$store.dispatch('minusEditCart', this.data.Product.id)
    },
    deleteCart () {
      this.$store.dispatch('deleteCart', this.data.Product.id)
    }

  },
  computed: {
    editError () {
      return this.$store.state.editError
    }
  }
}
</script>

<style>

</style>
