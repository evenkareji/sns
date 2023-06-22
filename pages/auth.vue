<script setup lang="ts">
import Register from './register.vue';
import SignIn from './signIn.vue';
import { ref } from 'vue';
const isFlag = ref<boolean>(true);
const chageAuthPage = (bool: any) => {
  isFlag.value = bool;
};
</script>

<template>
  <div class="w-96 mx-auto my-10">
    <div v-if="isFlag">
      <SignIn />
      <button @click="chageAuthPage(false)">新規登録</button>
    </div>
    <div v-else>
      <Register />
      <button @click="chageAuthPage(true)">ログイン</button>
    </div>
  </div>
</template>
