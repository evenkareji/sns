import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAaOfVvV0bhggxniwRC7tUagOyWIxQdaGY",
  authDomain: "maco-212c8.firebaseapp.com",
  projectId: "maco-212c8",
  storageBucket: "maco-212c8.appspot.com",
  messagingSenderId: "931085055728",
  appId: "1:931085055728:web:28f67a9e1bea1256d07435"
};

const app = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
