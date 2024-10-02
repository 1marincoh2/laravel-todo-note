<template>
  <div id="app">
    <Header v-if="!isHomeOrRegister" />
    <main>
      <router-view></router-view>
    </main>
    <Footer v-if="!isHomeOrRegister" />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";

const store = useStore();
const route = useRoute();

const isHomeOrRegister = computed(() => {
  return route.name === "home" || route.name === "register" || route.name === "login";
});

onMounted(() => {
  store.dispatch("auth/checkAuth");
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.full-height {
  height: 100vh;
}

main {
  flex: 1;
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
