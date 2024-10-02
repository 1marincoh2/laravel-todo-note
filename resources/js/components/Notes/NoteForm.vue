<template>
  <form v-if="!showTagForm" @submit.prevent="handleSubmit" class="note-form">
    <h2>{{ note ? "Edit" : "Create" }} Note</h2>

    <div class="form-group">
      <label for="title">Title</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        required
        class="input-field"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        required
        class="input-field"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="due_date">Due Date</label>
      <input id="due_date" v-model="formData.due_date" type="date" class="input-field" />
    </div>

    <!-- <div class="form-group">
      <label for="image">Image</label>
      <input
        type="file"
        id="image"
        @change="handleImageChange"
        accept="image/*"
        class="file-input"
      />
      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="Preview" class="preview-image" />
      </div>
    </div> -->

    <div class="form-group">
      <label>Tags</label>
      <div v-if="availableTags.length" class="tags-selection">
        <label v-for="tag in availableTags" :key="tag.id" class="tag-checkbox">
          <input type="checkbox" :value="tag.id" v-model="formData.tags" />
          {{ tag.name }}
        </label>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn submit">
        {{ note ? "Update" : "Create" }} Note
      </button>
      <button type="button" @click="$emit('cancel')" class="btn cancel">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import TagForm from "./TagForm.vue"; // Asegúrate de importar el nuevo componente

const props = defineProps({
  note: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["submit", "cancel"]);
const store = useStore();
// image: null,
const formData = ref({
  title: props.note?.title || "",
  description: props.note?.description || "",
  due_date: props.note?.due_date || "",

  tags: props.note?.tags?.map((tag) => tag.id) || [],
});

const availableTags = ref([]);
// const imagePreview = ref(null);
const showTagForm = ref(false);

onMounted(async () => {
  try {
    const tags = await store.dispatch("tags/fetchTags");
    availableTags.value = tags;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
  }

  if (props.note?.image) {
    imagePreview.value = props.note.image;
  }
});

// const handleImageChange = (event) => {
//   const file = event.target.files[0] || null;
//   formData.value.image = file;

//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       imagePreview.value = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   } else {
//     imagePreview.value = null;
//   }
// };

const handleSubmit = () => {
  const submitData = new FormData();

  submitData.append("title", formData.value.title);
  submitData.append("description", formData.value.description);

  if (formData.value.due_date) {
    submitData.append("due_date", formData.value.due_date);
  }

  // if (formData.value.image instanceof File) {
  //   submitData.append("image", formData.value.image);
  // }

  if (Array.isArray(formData.value.tags) && formData.value.tags.length > 0) {
    formData.value.tags.forEach((tagId) => {
      submitData.append("tags[]", tagId);
    });
  }

  emit("submit", submitData);
};

watch(
  () => props.note,
  (newNote) => {
    if (newNote) {
      formData.value = {
        title: newNote.title || "",
        description: newNote.description || "",
        due_date: newNote.due_date || "",
        image: null,
        tags: newNote.tags?.map((tag) => tag.id) || [],
      };
      imagePreview.value = newNote.image || null;
    }
  }
);
</script>
<style scoped>
.note-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.file-input {
  display: block;
}

.image-preview {
  margin-top: 10px;
}

.preview-image {
  max-width: 100%;
  border-radius: 4px;
}

.tags-selection {
  display: flex;
  flex-wrap: wrap;
}

.tag-checkbox {
  margin-right: 10px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit {
  background: #28a745;
  /* Green */
}

.submit:hover {
  background: #218838;
}

.cancel {
  background: #dc3545;
  /* Red */
}

.cancel:hover {
  background: #c82333;
}

.create-tag-btn {
  margin-left: 10px;
  background: #007bff;
  /* Blue */
}

.create-tag-btn:hover {
  background: #0056b3;
}
</style>
