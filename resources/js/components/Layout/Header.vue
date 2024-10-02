<template>
  <header class="header">
    <h1 class="title">My Application</h1>
    <div class="logout" @click="handleLogout">
      <img src="../../../../public/logout_icon.png" alt="Logo" class="logout-logo" />
      <!-- Asegúrate de cambiar la ruta a tu logo -->
      <span>Logout</span>
    </div>
  </header>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await store.dispatch("auth/logout");
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.logout {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
}

.logout-logo {
  width: 20px;
  /* Ajusta el tamaño del logo según sea necesario */
  height: 20px;
  /* Ajusta el tamaño del logo según sea necesario */
  margin-right: 5px;
  /* Espacio entre el logo y el texto */
}

.logout span {
  font-size: 16px;
  font-weight: 500;
}

.logout:hover {
  color: #dc3545;
  /* Color de hover rojo para el logout */
}
</style>
