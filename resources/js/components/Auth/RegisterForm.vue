<template>
  <div class="register-container">
    <h2>Únete a la Aventura</h2>
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirmar Contraseña</label>
        <input
          type="password"
          id="password_confirmation"
          v-model="passwordConfirmation"
          required
        />
        <p v-if="error" class="error">{{ error }}</p>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Registrarse</button>
        <button type="button" class="btn btn-back" @click="goToLogin">
          &#8592; Volver
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({
  error: {
    type: String,
    required: "",
  },
});
const store = useStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const handleSubmit = async () => {
  if (password.value !== passwordConfirmation.value) {
    alert("Las contraseñas no coinciden");
    return;
  }
  try {
    await store.dispatch("auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });
    router.push("/login");
  } catch (error) {
    console.error("El registro falló:", error);
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f8f9fa;
  /* Fondo suave */
  border-radius: 8px;
  /* Esquinas redondeadas */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* Sombra suave */
  color: #333;
  /* Texto oscuro */
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  /* Tamaño de fuente más pequeño */
}

.register-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  /* Peso de fuente más ligero */
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  /* Borde suave */
  border-radius: 4px;
  /* Esquinas redondeadas */
  font-size: 1rem;
  background-color: #fff;
  /* Fondo blanco */
  color: #495057;
  /* Texto oscuro */
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #80bdff;
  /* Color de borde al enfocarse */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  /* Sombra al enfocar */
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  /* Esquinas redondeadas */
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.btn-primary {
  background-color: #007bff;
  /* Color azul suave */
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  /* Color azul más oscuro al pasar el ratón */
}

.btn-back {
  background-color: transparent;
  color: #007bff;
  /* Color azul suave */
  border: 1px solid #007bff;
  /* Borde azul */
}

.btn-back:hover {
  background-color: rgba(0, 123, 255, 0.1);
  /* Fondo azul suave al pasar el ratón */
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
