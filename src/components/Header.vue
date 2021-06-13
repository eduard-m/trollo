<template>
    <header class="header">
        <h2 class="logo" @click="$router.push('/home')">
            <span class="font-weight-light">Trollo</span>
        </h2>
                <div class="menu">
                    <nav>
                        <li><router-link tag="a" to="/home">
                    <i class="fas fa-home"></i>
                    Главная
                </router-link></li>
                <li><router-link tag="a" to="/board">
                <i class="fas fa-clipboard-list"></i>
                Доска
            </router-link></li>
            <li><router-link tag="a" to="/">
                <i class="fas fa-sign-in-alt"></i>
                Login
            </router-link></li>
                    </nav>
                </div>

                <div class="menu-btn">
                    <span></span><span></span><span></span>
                </div>

    </header>
</template>

<script>

</script>

<style scoped>

</style>