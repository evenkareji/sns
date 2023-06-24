<template>
  <div class="border border-gray-300 w-72 p-3">
    <h1 class="text-lg font-bold">ログイン</h1>
    <p><input type="text" placeholder="email" v-model="email" /></p>
    <p><input type="password" placeholder="password" v-model="password" /></p>
    <p class="err" v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="authin">Submit</button></p>
    <p>
      <button
        class="bg-slate-400/100 w-64 rounded-md text-white p-1 my-5"
        @click="signInWithGoogle"
      >
        Sign In With Google
      </button>
    </p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import { doc,setDoc } from "firebase/firestore"
import { db } from '../src/plugins/firebase';
const { user } = useUserState();


const email = ref();
const password = ref();
const errMsg = ref();
const router = useRouter();

// const signInWithGoogle = () => {
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(getAuth(), provider)
//     .then((result) => {
//       // router.push('/post');
//     })
//     .catch((error) => {});
// };
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      const ref = doc(db, `users/${user.value.uid}`);
      const userData = {
        name: user.value.displayName,
      };
      console.log(userData);
      // refを代入しdocumentのidをセット
      setDoc(ref, userData).then(() => {
        alert('userの作成に成功しました');
      });
    })
    .catch((error) => {
      alert(error);
    });
};
const authin = ()=>{
  const auth = getAuth();
  // getAuthによりとってきたpasswordとemailを入力した内容と比較
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      router.push('/post');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'emailが違います';
          break;
        case 'auth/user-not-found':
          errMsg.value = 'アカウントが見つかりません';
          break;
        case 'auth/wrong-password':
          errMsg.value = 'passwordが違います';
          break;
        default:
          errMsg.value = 'email or password was incorrect';
          break;
      }
    });
};
</script>
<style>
.err {
  color: red;
}
</style>
