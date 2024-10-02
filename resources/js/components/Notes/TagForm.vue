<template>
  <div class="tag-form">
    <label for="new-tag">Create New Tag</label>
    <input
      id="new-tag"
      v-model="newTag"
      type="text"
      placeholder="New tag name"
      @keyup.enter.prevent="createNewTag"
      class="input-field"
    />
    <button type="button" @click="createNewTag" class="btn create-tag-btn">
      Add Tag
    </button>
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
  margin-top: 15px;
}

.input-field {
  width: calc(100% - 120px);
  display: inline-block;
}

.create-tag-btn {
  margin-left: 10px;
}
</style>
