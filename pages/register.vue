<template>
  <div class="border border-gray-300 w-72 p-3 my-6">
    <h1 class="font-bold text-lg">新規登録</h1>
    <p><input type="text" placeholder="email" v-model="email" /></p>
    <p><input type="password" placeholder="password" v-model="password" /></p>

    <p><button @click="register">Submit</button></p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
const { login, user } = useUserState();
console.log(user.value, 'register');
const email = ref();
const password = ref();

const router = useRouter();

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log('Succcessfully registered');
      router.push('/signIn');
    })
    .catch((err) => {
      console.log(err.code);
      alert(err.message);
    });
};

</script>
