<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{error}}</div>
    <button v-if="!isPending">Log in</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
import {useRouter} from "vue-router";

export default {
  setup() {

    const {error, signup, isPending } = useSignup();
    const displayName = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      const response = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        await router.push({name: 'Home'});
      }
    }

    return { email, password, displayName, isPending, error, handleSubmit };
  }
}
</script>

<style scoped>

</style>