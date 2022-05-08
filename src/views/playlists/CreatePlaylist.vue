<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>
    <div class="error"></div>
    <button>Save Playlist</button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const title = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleSubmit = () => {
      if (file.value) {

      }
    }

    const handleChange = (event) => {
      const selected = event.target.files[0];

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        fileError.value = 'Please select an image file (png, jpg or jpeg)';
        file.value = null;
      }
    }

    return { title, description, handleSubmit, handleChange, fileError };
  }
}
</script>

<style scoped>
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>