<script setup lang="ts">
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../src/plugins/firebase';
import { ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { Timestamp } from 'firebase/firestore';

const { user } = useUserState();
const posts = ref();
const inputtingCompany = ref();
const inputtingOccupation = ref();
const inputtingThoughts = ref();
const router = useRouter();
type Post = {
  // username: string;
  id: string;
  company: string;
  occupation: string;
  desc: string;
  createdAt: number;
  updateAt?: number | null;
  authorId: string;
  displayName: string;
};

let auth: any;
onMounted(() => {
  console.log(user.uid);
  auth = getAuth();
  console.log(auth, 'post.vue auth');
  console.log(user.value, 'post.vue');

  // マウントした時にpushで配列に入れて展開
  onSnapshot(collection(db, 'posts'), (querySnapshot) => {
    posts.value = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data().uid);
      // const post: Post = {
      // displayName: doc.data().displayName,
      //   uid: doc.data().uid,
      //   desc: doc.data().desc,
      //   company: doc.data().company,
      //   occupation: doc.data().occupation,
      //   timestamp:doc.data().timestamp,
      //   like: doc.data().like,
      //   pid:doc.data().pid
      // };
      const post: Post = {
        displayName: doc.data().displayName,
        id: doc.id,
        authorId: user.value.uid,
        desc: doc.data().desc,
        company: doc.data().company,
        createdAt: doc.data().createdAt,
        occupation: doc.data().occupation,
      };

      posts.value.push(post);
      console.log(posts.value);
      // console.log(posts.value[0].timestamp.seconds)
    });
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    console.log('logout');

    router.push('/');
  });
};
const addFirebase = (
  registerCompany: string,
  registerOccupation: string,
  registerThoughts: string,
) => {
  const ref = doc(collection(db, 'posts'));

  const post = {
    id: ref.id,
    displayName: user.value.displayName,
    company: registerCompany,
    desc: registerThoughts,
    occupation: registerOccupation,
    createdAt: Date.now(),
    updateAt: null,
    authorId: user.value.uid,
  };

  setDoc(ref, post).then(() => {
    alert('記事を作成しました');
  });
  console.log(user.value);
  inputtingCompany.value = '';
  inputtingOccupation.value = '';
  inputtingThoughts.value = '';
};

const postDelete = () => {
  console.log('delete');
};

const addLike = (pid: string, uid: string) => {
  console.log(pid, uid);
  // const que = query(collection(db, "users"), where("uid", "==", uid))
  onSnapshot(collection(db, 'users'), (querySnapshot: any) => {
    querySnapshot.forEach((doc: any) => {
      const likes: any = {
        like: doc.data().likes,
      };
      console.log(likes);
    });
  });
};
</script>

<template>
  <div class="text-center my-5">
    <button
      class="bg-slate-400/100 w-64 rounded-md text-white p-1 my-5"
      @click="handleSignOut"
    >
      sign out
    </button>
    <span class="px-3">
      <NuxtLink to="/profile">profile</NuxtLink>
    </span>
    <p>{{ user.displayName }}</p>
    <form
      class="w-96 mx-auto"
      @submit.prevent="
        addFirebase(inputtingCompany, inputtingOccupation, inputtingThoughts)
      "
    >
      <input
        class="block w-full focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
        placeholder="会社名"
        type="text"
        v-model="inputtingCompany"
      />
      <input
        class="block w-full focus:outline-none mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
        placeholder="職種"
        type="text"
        v-model="inputtingOccupation"
      />
      <textarea
        id="message"
        rows="4"
        class="mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="感想..."
        v-model="inputtingThoughts"
      ></textarea>
      <input
        type="submit"
        class="bg-sky-500/100 w-full rounded-md text-white p-1 my-5"
        value="送信"
      />
    </form>

    <div class="my-9">
      <div class="my-9 w-96 m-auto">
        <div
          class="rounded-md border-2 border-stone-400 p-5 my-3 text-left"
          v-for="post in posts"
          :key="post.createdAt"
        >
          <div class="pr-4">名前：{{ post.displayName }}</div>
          <div class="pr-4">会社名：{{ post.company }}</div>
          <div class="pr-4">職種：{{ post.occupation }}</div>
          <div>感想：{{ post.desc }}</div>
          <!-- <div class="">{{post.like.length}}いいね！</div> -->
          <p>
            <span
              >UID:{{ user.uid }}・PID:{{ post.id }} PPID:{{
                post.authorId
              }}</span
            >
          </p>
          <!-- <p>日時：{{ user.timestamp.seconds }}</p> -->
          <p>投稿日時{{ post.createdAt }}</p>
          <button v-if="user.uid == post.uid" @click="postDelete()">
            削除
          </button>
          <button @click="addLike(post.authorId, user.uid)" class="border-1">
            いいねネ！！
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
