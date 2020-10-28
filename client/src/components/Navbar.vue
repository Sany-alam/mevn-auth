<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Admin dashboard</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/" exact v-if="isLoggedIn">Home</router-link>
                </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/signin" exact v-if="!isLoggedIn">Signin</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/signup" exact v-if="!isLoggedIn">Signup</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/profile" exact v-if="isLoggedIn">Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" v-if="isLoggedIn" @click.prevent="logoutUser">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed:mapGetters(['isLoggedIn']),
    methods:{
        ...mapActions(['logout']),
        logoutUser(){
            this.logout().then(() => {
                this.$router.push('signin')
            })
        }
    },
}
</script>

<style>

</style>