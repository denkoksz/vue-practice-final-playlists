<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>
    <div class="error"></div>
    <button v-if="!isPending">Save Playlist</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import {timestamp} from "@/firebase/config";
import {useRouter} from "vue-router";

export default {
  setup() {
    const title = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const router = useRouter();

    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection('playlists');
    const { user } = getUser();
    const isPending = ref(false);

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp
        });
        isPending.value = false;
        if (!error.value) {
          console.log('playlist added');
          router.push( { name: 'PlaylistDetails', params: {id: res.id} } )
        }
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

    return { title, description, handleSubmit, handleChange, fileError, isPending };
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