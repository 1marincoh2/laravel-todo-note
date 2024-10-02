<template>
    <div class="home">
        <h1>Welcome to NotesApp</h1>
        <p>Organize your thoughts and tasks efficiently</p>
        <div class="actions">
            <router-link to="/login" class="btn">Login</router-link>
            <router-link to="/register" class="btn">Register</router-link>
        </div>
    </div>
</template>

<script setup>
// No se necesita lógica adicional para esta vista simple
</script>

<style scoped>
.home {
    text-align: center;
    padding: 2rem;
}

.actions {
    margin-top: 2rem;
}

.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 4px;
}
</style>
