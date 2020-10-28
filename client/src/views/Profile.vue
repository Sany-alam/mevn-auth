<template>
  <div>
    <main class="d-flex justify-content-center align-items-center shadow-sm">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="#" v-if="user">Name : {{ user.name }}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-if="user">Email : {{ user.email }}</a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed:mapGetters(['user']),
  methods:{
    ...mapActions(['getProfile'])
  },
  mounted(){
    this.getProfile()
  }
};
</script>

<style>
main {
  height: 90vh;
}
.jumbotron {
  width: 900px;
}
</style>