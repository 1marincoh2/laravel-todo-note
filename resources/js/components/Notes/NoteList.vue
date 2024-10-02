<template>
  <div class="notes-list">
    <div v-if="!notes.length" class="no-notes">
      No notes available. Create your first note!
    </div>
    <ul v-else>
      <li v-for="note in notes" :key="note.id">
        <NoteItem
          :note="note"
          @delete="$emit('delete', note.id)"
          @edit="$emit('edit', note.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import NoteItem from "./NoteItem.vue";

// Definimos las props que recibirá NoteList
defineProps({
  notes: {
    type: Array,
    required: true,
  },
});

// Emitimos los eventos delete y edit hacia el componente padre
defineEmits(["delete", "edit"]);
</script>

<style scoped>
.notes-list {
  margin-top: 20px;
}

.no-notes {
  text-align: center;
  font-size: 18px;
  color: #666;
}
</style>
