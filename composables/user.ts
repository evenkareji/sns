import type { Ref } from 'vue';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../src/plugins/firebase';

type User = {
  uid: string,
  displayName: string
}

export const login = (user: Ref<User>) => (value: User) => {
  let newUser = true
  user.value = value
  onSnapshot(collection(db, "users"), (queryString) => {
    console.log(queryString)
    queryString.forEach((doc) => {
      console.log(doc.data().uid, user.value.uid)
      if (doc.data().uid === user.value.uid) {
        newUser = false
        console.log(newUser)
      }
      console.log(doc.data())
    })
    console.log("直前", newUser)
    if (newUser === true) {
      console.log(user.value)
      console.log("ユーザー追加")
      addDoc(collection(db, "users"), {
        ...user.value,
        likes: []
      })
    } else {
      console.log("既に追加されている")
    }
  })
}

export const logout = (user: Ref<User>) => () =>
  (user.value = { uid: '', displayName: '' });

export const useUserState = () => {
  const user = useState<User>('user', () => ({
    uid: '',
    displayName: '',
  }));
  return {
    user: readonly(user),
    login: login(user), //一つ目のアロー関数内部に入る
    logout: logout(user),
  };
};
