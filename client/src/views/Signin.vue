<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-body">
        <div class="alert alert-danger" v-if="message">{{ message }}</div>
        <form @submit.prevent="signin">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <small>Don't have an account? <router-link to="signup">Signup</router-link></small>
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data () {
        return {
            email: '',
            password: '',
            message:''
        }
    },
    methods: {
      ...mapActions(['login']),
        signin () {
          let user = {
            email:this.email,
            password:this.password
          }
          this.login(user).then((res)=>{
            if (res.data.success) {
              this.$router.push('/profile')
            }
          }).catch((err)=>{
            this.message = err.response.data.message;
          })
        }
    }
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