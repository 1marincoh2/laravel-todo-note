<template>
  <div class="register">
    <RegisterForm @submit="handleRegister" :loading="loading" :error="error" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import RegisterForm from "../components/Auth/RegisterForm.vue";

const store = useStore();
const router = useRouter();
const loading = ref(false);
const error = ref(null);

const handleRegister = async (userData) => {
  loading.value = true;
  error.value = null;
  try {
    await store.dispatch("auth/register", userData);
    router.push("/notes");
  } catch (err) {
    error.value =
      "The password field must be at least 8 characters." ||
      "Registration failed. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register {
  margin: 0 auto;
  padding: 2rem;
}
</style>
