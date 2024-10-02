<template>
  <div class="note-item">
    <div class="note-content">
      <h3>{{ note.title }}</h3>
      <p>{{ note.description }}</p>
      <p v-if="note.due_date" class="due-date">Due: {{ formatDate(note.due_date) }}</p>
      <img
        v-if="note.image"
        :src="`/storage/${note.image}`"
        :alt="note.title"
        class="note-image"
      />
      <div v-if="note.tags && note.tags.length" class="tags">
        <span v-for="tag in note.tags" :key="tag.id" class="tag">{{ tag.name }}</span>
      </div>
    </div>
    <div class="actions">
      <button @click="$emit('edit')" class="btn edit">Edit</button>
      <button @click="handleDelete" class="btn delete">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Definimos las props que recibe NoteItem
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

// Definimos los eventos que emitirá NoteItem
const emit = defineEmits(["edit", "delete"]);

// Función para formatear la fecha
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Función para manejar la eliminación de la nota
const handleDelete = () => {
  if (confirm("Are you sure you want to delete this note?")) {
    emit("delete");
  }
};
</script>

<style scoped>
.note-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.note-content {
  flex-grow: 1;
}

.note-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.tags {
  margin-top: 10px;
}

.tag {
  background-color: #e0e0e0;
  border-radius: 15px;
  padding: 4px 8px;
  margin-right: 5px;
  font-size: 12px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn.edit {
  background-color: #2196f3;
  color: white;
  border: none;
}

.btn.delete {
  background-color: #f44336;
  color: white;
  border: none;
}
</style>
