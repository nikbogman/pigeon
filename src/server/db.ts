import { env } from "../env/server.mjs";
import { initializeApp } from "firebase/app";
import { collection, Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA44ASFl-TVfuNXNJp4esNP1FEsKmGkGgI",
  authDomain: "pigeon-77ca9.firebaseapp.com",
  projectId: "pigeon-77ca9",
  storageBucket: "pigeon-77ca9.appspot.com",
  messagingSenderId: "335495812325",
  appId: "1:335495812325:web:033c4799c26e1c1fc0300c",
  measurementId: "G-6M0HBTPG99"
};

const app = initializeApp(firebaseConfig);

declare global {
  // eslint-disable-next-line no-var
  var db: Firestore | undefined;
}

export const db =
  global.db || getFirestore(app);

if (env.NODE_ENV !== "production") {
  global.db = db;
}

export const invitationCollection = collection(db, 'invitations');
export const guestCollection = collection(db, 'guests');
