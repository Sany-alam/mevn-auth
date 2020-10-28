<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-body">
        <div class="alert alert-success" v-if="message">{{message}}</div>
        <form @submit.prevent="signup">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="name" type="text" class="form-control" id="name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <small>Already have an account? <router-link to="signin">Signin</router-link></small>
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message:''
    };
  },
  methods: {
    ...mapActions(["register"]),
    signup() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      this.register(user)
        .then((res) => {
          if (res.data.success) {
            // this.$router.push("signin");
            this.message = `${res.data.message}`
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
};
</script>

<style>
main {
  height: 80vh;
}
.card {
  width: 380px;
}
</style>