<template>
  <div class="edit-note-view">
    <h1>Edit Note</h1>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="isLoading" class="loading">Loading...</div>

    <NoteForm
      v-else-if="currentNote"
      :note="currentNote"
      @submit="updateNote"
      @cancel="navigateBack"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import NoteForm from "../components/Notes/NoteForm.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();

const currentNote = computed(() => store.getters["notes/currentNote"]);
const isLoading = computed(() => store.getters["notes/isLoading"]);
const error = computed(() => store.getters["notes/error"]);

// Cargamos la nota actual cuando se monta el componente
onMounted(async () => {
  const noteId = parseInt(route.params.id);
  if (isNaN(noteId)) {
    router.push({ name: "notes" });
    return;
  }

  try {
    await store.dispatch("notes/fetchNote", noteId);
  } catch (error) {
    console.error("Failed to fetch note:", error);
  }
});

// Función para manejar la actualización de la nota
const updateNote = async (noteData) => {
  try {
    await store.dispatch("notes/updateNote", {
      id: route.params.id,
      noteData,
      user_id: localStorage.getItem("user_id"),
    });
    router.push({ name: "notes" });
  } catch (error) {
    console.error("Failed to update note:", error);
  }
};

// Función para navegar de regreso a la lista de notas
const navigateBack = () => {
  router.push({ name: "notes" });
};
</script>

<style scoped>
.edit-note-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.error-message {
  color: #dc3545;
  margin-bottom: 15px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>
