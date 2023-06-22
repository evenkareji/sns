<script setup lang="ts">
import { db } from '../src/plugins/firebase';
import{getDoc,doc,collection,onSnapshot} from "firebase/firestore"

const { logout, login, user } = useUserState();
import { getAuth, onAuthStateChanged } from 'firebase/auth';
let auth: any;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (authUser) => {
    console.log(authUser, 'auth');

    if (authUser) {
      const loginUser: any = {
        uid: authUser.uid,
        displayName: authUser.displayName,
      };
      console.log("login")
      login(loginUser);
      onSnapshot(collection(db, 'users'), (querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          const likes: any = {
            like: doc.data().likes
          }
          console.log(likes)
        })
      })
    } else {
      console.log("logout")
      this.$router.push("index")
      logout();
    }
  });
});

 const  getLike =async () => {
  console.log(user.value.uid)
  const getUser = doc(db, "users", user.value.uid)
  console.log(getUser)
  const userSnap = getDoc(getUser)
  console.log(userSnap)
}


getLike()
</script>
<template>
  <div>
  <p>{{ user.displayName }}</p>
  <h1 class="text-red-400 text-xl">profile</h1>
  <span class="px-3">
    <NuxtLink to="/post">Post</NuxtLink>
  </span>
  <div>
    <h2>いいねページ</h2>
    <ul>
      <!-- <li v-for></li> -->
    </ul>
  </div>
  </div>
</template>
