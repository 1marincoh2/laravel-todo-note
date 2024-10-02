<template>
  <div class="notes-view" style="margin-top: 5%">
    <div class="header">
      <h1>My Notes</h1>
      <div class="button-group">
        <button @click="toggleCreateForm" class="btn create-note">Create New Note</button>
        <button @click="toggleCreateTag" class="btn create-tag">Create New Tag</button>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <NoteForm v-if="showCreateForm" @submit="createNote" @cancel="hideAllForms" />
    <TagForm v-if="showCreatetag" @tagCreated="addTagToForm" @cancel="hideAllForms" />

    <div v-if="isLoading" class="loading">Loading...</div>

    <NoteList v-else :notes="notes" @delete="deleteNote" @edit="navigateToEdit" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NoteList from "../components/Notes/NoteList.vue";
import NoteForm from "../components/Notes/NoteForm.vue";
import TagForm from "../components/Notes/TagForm.vue";

const store = useStore();
const router = useRouter();
const showCreateForm = ref(false);
const showCreatetag = ref(false);

const notes = computed(() => store.getters["notes/allNotes"]);
const isLoading = computed(() => store.getters["notes/isLoading"]);
const error = computed(() => store.getters["notes/error"]);

onMounted(async () => {
  try {
    await store.dispatch("notes/fetchNotes");
  } catch (error) {
    console.error("Failed to fetch notes:", error);
  }
});

const toggleCreateForm = () => {
  showCreateForm.value = !showCreateForm.value;
  showCreatetag.value = false;
};

const toggleCreateTag = () => {
  showCreatetag.value = !showCreatetag.value;
  showCreateForm.value = false;
};

const addTagToForm = () => {
  hideAllForms();
};
const hideAllForms = () => {
  showCreateForm.value = false;
  showCreatetag.value = false;
};

const createNote = async (noteData) => {
  try {
    await store.dispatch("notes/createNote", noteData);
    await store.dispatch("notes/fetchNotes");
    hideAllForms();
  } catch (error) {
    console.error("Failed to create note:", error);
  }
};

const deleteNote = async (noteId) => {
  try {
    await store.dispatch("notes/deleteNote", noteId);
  } catch (error) {
    console.error("Failed to delete note:", error);
  }
};

const navigateToEdit = (noteId) => {
  router.push({ name: "edit-note", params: { id: noteId } });
};
</script>

<style scoped>
.notes-view {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
}

/* Agrupación de botones */
.button-group {
  display: flex;
  gap: 10px;
  /* Espacio entre los botones */
  justify-content: flex-end;
  /* Alinea a la derecha */
}

.btn.create-note {
  padding: 5px 10px;
  background: #28a745;
  /* Verde */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.btn.create-note:hover {
  background: #218838;
}

.btn.create-tag {
  padding: 5px 10px;
  background: #ffc107;
  /* Amarillo */
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.btn.create-tag:hover {
  background: #e0a800;
}

.error-message {
  padding: 10px;
  margin-bottom: 20px;
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #555;
  margin: 20px 0;
}
</style>
