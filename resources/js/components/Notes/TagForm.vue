<template>
  <div class="tag-form">
    <label for="new-tag" class="tag-label">Create New Tag</label>
    <div class="input-group">
      <input
        id="new-tag"
        v-model="newTag"
        type="text"
        placeholder="Enter tag name"
        @keyup.enter.prevent="createNewTag"
        class="input-field"
      />
      <button type="button" @click="createNewTag" class="btn create-tag-btn">
        Add Tag
      </button>
    </div>
    <button type="button" @click="$emit('cancel')" class="btn cancel-tag-btn">
      Cancel
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["tagCreated"]);
const store = useStore();

const newTag = ref("");

const createNewTag = async () => {
  if (newTag.value.trim() === "") return;

  try {
    const createdTag = await store.dispatch("tags/createTag", { name: newTag.value });
    emit("tagCreated", createdTag);
    newTag.value = ""; // Reset input
  } catch (error) {
    console.error("Failed to create new tag:", error);
  }
};
</script>

<style scoped>
.tag-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tag-label {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #374151;
  font-weight: 600;
}

.input-group {
  display: flex;
  width: 100%;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #6366f1;
}

.btn {
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #4f46e5;
}

.create-tag-btn {
  flex-shrink: 0;
}

.cancel-tag-btn {
  background-color: #f3f4f6;
  color: #374151;
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

.cancel-tag-btn:hover {
  background-color: #e5e7eb;
}

@media (max-width: 600px) {
  .tag-form {
    width: 100%;
  }
  .input-field {
    width: calc(100% - 90px);
  }
}
</style>
