<template>
    <section class="mx-auto p-3 sec-log">
        <form @submit.prevent="handleSubmit" class="login">
            <div class="form-group mx-auto h3 text-center head-login">
                Trollo
            </div>

            <div class="form-group mx-auto">
                <input v-model="email" type="text" class="form-control my-3 mx-auto w-75" placeholder="Email">
                <input v-model="password" type="text" class="form-control my-3 mx-auto w-75" placeholder="password">
            </div>

            <div class="form-group text-center">
                <router-link type="submit" class="btn btn-primary" to="/board">Login</router-link>
            </div>

            <div class="form-group text-center mx-auto h3">
                <router-link class="h6 my-3" to="/home">To home page</router-link>
            </div>
        </form>
    </section>
</template>

<script>
import axios from 'axios'
  export default {
   name: 'login',
   data() {
       return {
           email: '',
           password: ''
       }
   },
   methods: {
       async handleSubmit() {
           const response = await axios.post('login', {
               email: this.email,
               password: this.password
           });
           console.log(response)
       }
   }
  }
</script>
