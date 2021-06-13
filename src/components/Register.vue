<template>
    <section class="container mx-auto w-25 p-3">
        <form @submit.prevent="handleSubmit">
            <h3 class="form-group mx-auto h3 text-center">
                Регистрация
            </h3>

            <div class="form-group mx-auto">
                <label>Имя</label>
                <input type="text" class="form-control mb-3" v-model="name">
            </div>

            <div class="form-group mx-auto">
                <label>Email</label>
                <input type="text" class="form-control mb-3" v-model="email">
            </div>

            <div class="form-group mx-auto">
                <label>Пароль</label>
                <input type="password" class="form-control mb-3" v-model="password">
            </div>

            <div class="form-group mx-auto mb-5">
                <label>Повторите пароль</label>
                <input type="password" class="form-control" v-model="password_confirm">
            </div>

            <div class="text-center">
                <button class="btn btn-primary form-control">Зарегистрироваться</button>
            </div>
        </form>
    </section>

</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
        }
    },
    methods: {
        async handleSubmit() {
            await axios.post('register', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirm: this.password_confirm
            });
            this.$router.push('/');
        }
    }
}
</script>