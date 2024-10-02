<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    await store.dispatch("auth/login", { email: email.value, password: password.value });
    console.log("yes");
    router.push("/notes");
    console.log("no");
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
